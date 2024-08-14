"use client"
import Image from "next/image";
import React, { useState } from "react";
import AdminTable from "./AdminTable";
import NewProductModal from "./NewProductModal";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="flex justify-center xl:h-[calc(100vh-58px)] min-h-screen">
    <div className="bg-white m-[26px] w-full flex flex-col shadow-xl">
      <div className="mt-[24px] text-[20px] text-primary text-center">
        Products
      </div>
      <div className="md:w-[90%] lg:w-[80%] mx-auto">
        <div className="mt-[59px] flex md:justify-end justify-center gap-1 md:mx-0 mx-4">
          <button
            className="w-full md:w-[105px] h-[38px] bg-primary text-white rounded-full text-xs mb-2 md:mb-0"
            onClick={() => setIsModalOpen(true)}
          >
            New Product
          </button>
          <button className="w-full md:w-[105px] h-[38px] border border-primary text-primary rounded-full text-xs ms-0 md:ms-4">
            Export To Excel
          </button>
        </div>
        <div className="my-[20px] mt-4 md:overflow-x-hidden overflow-x-auto md:w-full w-screen">
          <AdminTable />
        </div>
      </div>
    </div>
    {isModalOpen && (
      <NewProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </div>
  );
};

export default Admin;
