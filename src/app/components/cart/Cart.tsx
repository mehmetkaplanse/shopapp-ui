"use client"
import React from "react";
import CartTable from "./CartTable";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Cart = () => {
  const router = useRouter();
  const continueShopping = () => {
    router.push("/products");
  };
  const toBuy = () => {
    router.push("/products")
    toast.success('Shopping done successfuly!');
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white min-w-[908px] min-h-[627px] rounded-[20px] mt-[52px] shadow-2xl">
        <CartTable />
        <div className="mx-[74px] my-8 flex justify-between mt-[240px]">
          <button
            className="w-[252px] h-[38px] text-[#B9B9B9] border border-[#B9B9B9]  rounded-full text-sm mt-10"
            onClick={continueShopping}
          >
            Alışverişe Devam Et
          </button>
          <button className="w-[252px] h-[38px] bg-primary text-white rounded-full text-sm mt-10" onClick={toBuy}>
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
