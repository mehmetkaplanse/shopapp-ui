"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Product from "../components/product/Product";
import { PuffLoader } from "react-spinners";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productsSlice";
import { Product as ProductModel } from "./model/Product";

const ProductsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: products, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full bg-secondary h-[calc(100vh-51px)]">
        {status === "loading" ? (
          <div className="flex justify-center items-center mt-[300px]">
            <PuffLoader />
          </div>
        ) : (
          <div className="grid grid-cols-5">
            {products.map((product) => (
              <Product key={product?.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
