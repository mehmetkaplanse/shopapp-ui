"use client"
import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import createOrder from "./service/CreateOrder.Service";
import { OrderRequest } from "./model/OrderRequest";
import { clearCart, removeFromCart } from "@/redux/cartSlice";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { carts } = useSelector((state: RootState) => state.cart);
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const [orderData, setOrderData] = useState<OrderRequest | null>(null);

  const continueShopping = () => {
    router.push("/products");
  };

  const toBuy = async () => {
    if (orderData) {
      try {
        const res = await createOrder(orderData);
        if (res) {
          toast.success("Your order has received successfuly.");
          dispatch(clearCart()); 
          router.push("/order");
        }
      } catch (error) {
        console.error("Sipariş oluşturulurken hata oluştu:", error);
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Please enter required fields!");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    setCurrentUser(storedUser !== null ? Number(storedUser) : null); 
  }, []);

  useEffect(() => {
    if (currentUser && carts.length > 0) {
      setOrderData({
        user_id: currentUser,
        name: carts[0].name,
        price: carts[0].price,
        quantity: carts[0].quantity,
      });
    }
  }, [currentUser, carts]);

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
          <button
            className="w-[252px] h-[38px] bg-primary text-white rounded-full text-sm mt-10"
            onClick={toBuy}
          >
            Satın Al
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
