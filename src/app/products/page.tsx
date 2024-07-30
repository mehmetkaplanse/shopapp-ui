"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Product from "../components/product/Product";
import getAllProducts from "./service/getProductService";
import { Product as ProductModel } from "./model/Product";
import { HashLoader, PuffLoader } from "react-spinners";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-secondary h-[calc(100vh-51px)] ">
        {isLoading && (
          <div className="flex justify-center items-center mt-[200px]">
            <PuffLoader />
          </div>
        )}
        <div className="grid grid-cols-5">
          {products.map((product) => (
            <Product key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
