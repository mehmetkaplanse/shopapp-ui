import { Product } from "@/app/products/model/Product";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { PuffLoader } from "react-spinners";
import { Category } from "../sidebar/model/Category";
import getAllCategories from "../sidebar/service/Category.Service";
import noImage from "../../../assets/images/noImage.jpg";
import getAllProducts from "./service/Product.Service";

const AdminTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean | null>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean | null>(
    false
  );
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const getCategoryNameById = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : "Unknown Category";
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleEditProduct = (item: Product) => {
    if (item) {
      setIsEditModalOpen(true);
      setEditProduct(item);
    }
  };

  const handleDeleteModalOpen = (id: number) => {
    setIsDeleteModalOpen(true);
    setDeleteProductId(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[200px]">
        <PuffLoader />
      </div>
    );
  }

  return (
    <table className="md:mx-0 mx-4  border-collapse border border-gray-200 w-full text-left md:text-base text-sm">
      <thead className="bg-[#FFFFFF00]">
        <tr>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100">
            Ürün Resmi
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100">
            Ürün Adı
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100">
            Açıklama
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100">
            Fiyatı (TL)
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100">
            Kategori
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            İşlem
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: any) => (
          <tr key={item.id}>
            <td className="border border-gray-200 px-4 py-2 flex items-center justify-center ">
              {item.image ? (
                <div className="w-[60px] h-[60px]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[60px] h-[60px]">
                  <Image
                    src={noImage}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </td>
            <td className="border border-gray-200 px-4 py-2">{item.name}</td>
            <td className="border border-gray-200 px-4 py-2">
              {item.explanation.length > 40
                ? item.explanation.substring(0, 40) + "..."
                : item.explanation}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {item.price} TL
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {getCategoryNameById(item.category_id)}
            </td>
            <td className="border border-gray-200 px-4 py-2">
              <div className="flex md:gap-2 gap-1 justify-center">
                <button
                  className="bg-primary text-white p-[6px] rounded-full text-center"
                  onClick={() => handleEditProduct(item)}
                >
                  <MdEdit size={25} />
                </button>
                <button
                  className="bg-red-500 text-white p-[6px] rounded-full text-center ms-2"
                  onClick={() => handleDeleteModalOpen(item?.id)}
                >
                  <MdDeleteForever size={25} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {isEditModalOpen && (
        <UpdateProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={editProduct}
          fetchProducts={fetchProducts}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          deleteProductId={deleteProductId}
          fetchProducts={fetchProducts}
        />
      )}
    </table>
  );
};

export default AdminTable;
