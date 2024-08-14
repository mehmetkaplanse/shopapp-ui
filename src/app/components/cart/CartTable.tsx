"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { removeFromCart } from "@/redux/cartSlice";
import noImage from "../../../assets/images/noImage.jpg";

const CartTable = () => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex justify-center mt-5 max-h-[300px] md:overflow-x-hidden overflow-x-auto min-w-screen md:w-full">
      <table className="border-collapse border border-gray-200 max-w-[714px] mt-[80px] md:text-base text-xs min-w-full">
        <thead className="bg-[#FFFFFF00]">
          <tr>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 bg-gray-100 text-center">
              Ürün Resmi
            </th>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 bg-gray-100 text-center">
              Ürün Adı
            </th>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 bg-gray-100 text-center">
              Fiyatı
            </th>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 bg-gray-100 text-center">
              Adeti
            </th>
            <th className="border border-gray-200 px-2 sm:px-4 py-2 bg-gray-100 text-center">
              Sepetten çıkar
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item: any) => (
            <tr key={item.id}>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 flex items-center justify-center">
                <div className="w-[40px] h-[40px]">
                  <Image
                    src={item.image || noImage}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="object-cover w-full h-full"
                  />
                </div>
              </td>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 text-center">
                {item.name}
              </td>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 text-center">
                {item.price} TL
              </td>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 text-center">
                {item.quantity}
              </td>
              <td className="border border-gray-200 px-2 sm:px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white px-2 sm:px-4 py-2 rounded-full"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
