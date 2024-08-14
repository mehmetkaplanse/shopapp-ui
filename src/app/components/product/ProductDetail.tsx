"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImage from "../../../assets/images/image 1.png";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import getProductById from "./service/ProductById.Service";
import { Product } from "@/app/products/model/Product";
import { PuffLoader } from "react-spinners";
import noImage from "../../../assets/images/noImage.jpg";

interface ProductDetailProps {
  productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const fetchProductById = async () => {
    setIsLoading(true);
    const data = await getProductById(productId);
    setProduct(data);
    setIsLoading(false);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);
  return (
    <div className=" flex justify-center">
      <div className="bg-white w-[784px] h-[427px] shadow-xl rounded-2xl mt-[104px]">
        {isLoading ? (
          <div className="flex justify-center items-center mt-[180px]">
            <PuffLoader />
          </div>
        ) : (
          <div className="flex justify-center mt-[25px] flex-col items-center">
            <div className="mb-4">
              {product?.image ? (
                <Image
                  src={product?.image || ""}
                  alt="product_image"
                  width={60}
                  height={60}
                  className="w-32 h-44 object-cover"
                />
              ) : (
                <Image
                  src={noImage}
                  alt="product_image"
                  width={50}
                  height={50}
                  className="w-32 h-44 object-cover"
                />
              )}
            </div>
            <div className="text-xs mt-4">{product?.name}</div>
            <p className="text-xs mx-[177px] mt-2">{product?.explanation}</p>
            <div className="text-xs mt-2">{product?.price} TL</div>
            <button
              className="bg-primary text-white w-[105px] h-[30px] rounded-full text-xs mt-10"
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
