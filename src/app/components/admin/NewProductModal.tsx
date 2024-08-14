import { Product } from "@/app/products/model/Product";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import getAllCategories from "../sidebar/service/Category.Service";
import { Category } from "../sidebar/model/Category";
import { CreateProductModel } from "@/app/components/admin/model/CreateProductModel";
import toast from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/config/config";
import { v4 } from "uuid";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import { createProduct } from "./service/Product.Service";

const NewProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const { register, handleSubmit } = useForm<CreateProductModel>();
  const onSubmit: SubmitHandler<CreateProductModel> = async (data) => {
    if (imageUrl !== null) {
      data.image = imageUrl;
      await handleCreateProduct(data);
      console.log("eklendii",data);
      
      onClose();
    }
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true);
      uploadImage(e.target.files[0]);
    }
  };

  const uploadImage = (image: File) => {
    if (image == null) return;
    setIsLoading(true);
    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
        setIsLoading(false);
        toast.success("Image uploaded successfully.");
      });
    });
  };

  const handleCreateProduct = async (data: CreateProductModel) => {
    const res = await createProduct(data);
    if (res) {
      toast.success("Product created successfully!");
    }
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    if (data) {
      setCategories(data);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  console.log("image url:", imageUrl);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-10 rounded-lg w-[669px] h-[529px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-center text-primary text-2xl font-bold mb-10">
          ADD PRODUCT
        </h2>
        <form className="space-y-8">
          <div className="flex justify-between items-center h-full space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Product Name"
                {...register("name")}
                className="w-full px-4 py-4 border rounded-md"
              />
            </div>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="file"
                placeholder="Add Photo"
                onChange={onChangeImage}
                className="w-full px-4 py-4 border rounded-md"
              />
              {isLoading ? (
                <PuffLoader size={40} />
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Uploaded Image"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              type="number"
              placeholder="Price"
              {...register("price")}
              className="w-full px-4 py-4 border rounded-md"
            />
            <select
              className="w-full px-4 py-4 border rounded-md"
              {...register("category_id")}
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
            className="w-full px-4 py-4 border rounded-md h-24"
          />
          <button
            type="button"
            className="w-full bg-primary text-white py-4 rounded-md font-bold text-xl mt-4"
            onClick={handleSubmit(onSubmit)}
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProductModal;
