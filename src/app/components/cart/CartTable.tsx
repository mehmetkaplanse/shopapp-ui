"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { removeFromCart } from "@/redux/cartSlice";

const CartTable = () => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex justify-center mt-5  max-h-[300px] overflow-y-auto">
      <table className="table-auto border-collapse border border-gray-200 w-[714px] mt-[80px] text-left">
        <thead className="bg-[#FFFFFF00]">
          <tr>
            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
              Ürün Resmi
            </th>
            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
              Ürün Adı
            </th>
            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
              Fiyatı
            </th>
            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
              Adeti
            </th>
            <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
              Sepetten çıkar
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item: any) => (
            <tr key={item.id}>
              <td className="border border-gray-200 px-4 py-2">
                <div className="bg-yellow-300 px-4 py-2 text-center rounded-full text-sm">
                  No Image!
                </div>
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                {item.name}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                {item.price} TL
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                {item.quantity}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
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
