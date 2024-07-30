"use client"
import Image from "next/image";
import React, { useState } from "react";
import AdminTable from "./AdminTable";
import NewProductModal from "./NewProductModal";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(false);
  return (
    <div className="flex justify-center w-full h-[calc(100vh-58px)]">
      <div className="bg-white m-[26px] w-full flex flex-col shadow-xl">
        <div className="mt-[24px] text-[20px] text-primary text-center">
          Products
        </div>
        <div className="w-[1073px] mx-auto">
          <div className="mt-[59px] flex justify-end">
            <button
              className="w-[105px] h-[38px] bg-primary text-white rounded-full text-xs"
              onClick={() => setIsModalOpen(true)}
            >
              New Product
            </button>
            <button className="w-[105px] h-[38px] border border-primary text-primary rounded-full text-xs ms-4">
              Export To Excel
            </button>
          </div>
          <div className="mt-[20px]">
            <AdminTable />
          </div>
        </div>
        <div></div>
      </div>
      {
        isModalOpen && (
            <NewProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        )
      }
    </div>
  );
};

export default Admin;
