import Image from "next/image";
import React, { useEffect, useState } from "react";
import { OrderResponse } from "./model/OrderResponse";
import getAllOrders, { deleteOrderById } from "./service/Order.Service";
import { PuffLoader } from "react-spinners";
import toast from "react-hot-toast";

const OrderTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await getAllOrders();
      if (res) {
        setOrders(res);
        setIsLoading(false);
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error, "errorr");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const removeOrder = async (id: number) => {
    try {
      if (id) {
        const res = await deleteOrderById(id);
        toast.success("The Order has been deleted.");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[200px]">
        <PuffLoader />
      </div>
    );
  }

  return (
    <table className="border-collapse border border-gray-200 md:w-full w-screen text-left">
      <thead className="bg-[#FFFFFF00]">
        <tr>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            User
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            Name
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            Price (TL)
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            Quantity
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            Date
          </th>
          <th className="border border-gray-200 px-4 py-2 bg-gray-100 text-center">
            Option
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, i) => (
          <tr key={item.id}>
            <td className="border border-gray-200 text-sm text-blue-500 text-center p-2">
              @{item.user}
            </td>
            <td className="border border-gray-200 text-sm text-center p-2">
              {item.name}
            </td>
            <td className="border border-gray-200 text-sm text-center p-2">
              {item.price} TL
            </td>
            <td className="border border-gray-200 text-sm text-center p-2">
              {item.quantity}
            </td>
            <td className="border border-gray-200 text-sm text-center p-2">
              {item.createdDate ? (item.createdDate).substring(0,10) : "Unknown"}
            </td>
            <td className="border border-gray-200  text-sm text-center p-2">
              <button
                className="text-red-500 border border-red-500 p-[4px]  text-center ms-2"
                onClick={() => removeOrder(item.id)}
              >
                Delete Order
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
