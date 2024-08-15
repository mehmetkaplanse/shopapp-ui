import { Product } from "@/app/products/model/Product";
import React, { useEffect, useState } from "react";
import getAllCategories from "../sidebar/service/Category.Service";
import { Category } from "../sidebar/model/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import { UpdateProductModel } from "./model/UpdateProductModel";
import toast from "react-hot-toast";
import Image from "next/image";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/config";
import { v4 } from "uuid";
import noImage from '../../../assets/images/noImage.jpg'
import { updateProduct } from "./service/Product.Service";
import {
  productNameValidation,
  priceValidation,
  categoryValidation,
  explanationValidation,
} from "./validation/CreateProductValidation";

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  fetchProducts: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  onClose,
  product,
  fetchProducts,
}) => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const { register, handleSubmit, formState: {errors} } = useForm<UpdateProductModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.image || null
  );
  const onSubmit: SubmitHandler<UpdateProductModel> = async (data) => {
    if (imageUrl !== null) {
      data.image = imageUrl;
      await handleUpdateProduct(data);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    const data = await getAllCategories();
    if (data) {
      setCategories(data);
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (data: UpdateProductModel) => {
    if (product?.id) {
      const res = await updateProduct(product?.id, data);
      if (res) {
        onClose();
        toast.success("Product updated succesfully.");
        fetchProducts();
      }
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = (image: File) => {
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setIsLoading(false);
        toast.success("Image updated successfully.");
      });
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setImageUrl(imageUrl);
    }
  }, [imageUrl]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-10 rounded-lg w-[669px] md:min-h-[529px] relative md:mx-0 mx-2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-center text-primary text-2xl font-bold mb-10">
          UPDATE PRODUCT
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center mt-[200px]">
            <PuffLoader />
          </div>
        ) : (
          <form className="space-y-8">
            <div className="flex md:flex-row flex-col gap-4 justify-between md:items-center md:space-x-4">
              <div className="flex-1 h-full">
                <input
                  type="text"
                  placeholder="Product Name"
                  {...register("name")}
                  defaultValue={product?.name}
                  className="w-full px-4 py-4 border rounded-md"
                />
              </div>
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="file"
                  placeholder="Prev Photo"
                  onChange={onChangeImage}
                  className="w-full px-4 py-4 border rounded-md"
                />
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Uploaded Image"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={noImage}
                    alt="Uploaded Image"
                    width={40}
                    height={40}
                  />
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-4 md:space-x-4">
              <input
                type="number"
                placeholder="Price"
                {...register("price", priceValidation)}
                defaultValue={product?.price}
                className="w-full px-4 py-4 border rounded-md"
              />
              <select
                className="w-full px-4 py-4 border rounded-md"
                {...register("category_id")}
                defaultValue={product?.category_id}
              >
                <option
                  value=""
                  disabled
                  selected
                  hidden
                  className="text-gray-500"
                >
                  Select Category
                </option>
                {categories?.map((cat) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Write explanation here"
              {...register("explanation")}
              defaultValue={product?.explanation}
              className="w-full px-4 py-4 border rounded-md h-24"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-md font-bold text-xl mt-4"
              onClick={handleSubmit(onSubmit)}
            >
              SAVE
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProductModal;
