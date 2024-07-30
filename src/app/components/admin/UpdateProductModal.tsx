import { Product } from "@/app/products/model/Product";
import React, { useEffect, useState } from "react";
import getAllCategories from "../sidebar/service/getCategoryService";
import { Category } from "../sidebar/model/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import { PuffLoader } from "react-spinners";
import updateProduct from "./service/updateProductService";
import { UpdateProductModel } from "./model/UpdateProductModel";
import toast from "react-hot-toast";

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
  fetchProducts
}) => {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const { register, handleSubmit } = useForm<UpdateProductModel>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onSubmit: SubmitHandler<UpdateProductModel> = async (data) => {
    if(data) {
      handleUpdateProduct(data);
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
    if(product?.id) {
      const res = await updateProduct(product?.id, data);
      if(res) {
        onClose()
        toast.success("Product updated succesfully.")
        fetchProducts();
      }
    }
  }

  useEffect(() => {

    fetchCategories();
  }, []);
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
          UPDATE PRODUCT
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center mt-[200px]">
            <PuffLoader />
          </div>
        ) : (
          <form className="space-y-8">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-4 border rounded-md"
                {...register("name")}
                defaultValue={product?.name}
              />
              <input
                type="file"
                placeholder="Add Photo"
                disabled
                className="w-full px-4 py-4 border rounded-md"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Price"
                {...register("price")}
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
