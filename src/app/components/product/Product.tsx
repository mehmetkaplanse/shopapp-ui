"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { Product as ProductModel } from "@/app/products/model/Product";
import noImage from "../../../assets/images/noImage.jpg"

interface ProductProps {
  product: ProductModel;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [productId, setProductId] = useState<number | null>(product?.id);
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };
  return (
    <div className="bg-white w-[217px] ms-8 mt-14 flex flex-col gap-2 items-center py-4 rounded-3xl shadow-xl">
      <Link href={`/products/${productId}`} className="h-[170px] w-[120px]">
        {product.image ? (
          <Image
            src={product?.image}
            alt="product_image"
            width={50}
            height={50}
            className="w-32 h-44 object-cover"
          />
        ): (
          <Image src={noImage} alt="product_image" className="w-32 h-44 object-cover" />
        )
      }
      </Link>
      <div className="border-b border-b-gray-300 w-44 mt-2"></div>
      <div className="text-center mt-2">
        <div className="text-xs">{product?.name}</div>
        <div className="text-xs">{product?.price} TL</div>
      </div>
      <button
        className="bg-primary text-white w-[105px] h-[30px] rounded-full text-xs"
        onClick={handleAddToCart}
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default Product;
