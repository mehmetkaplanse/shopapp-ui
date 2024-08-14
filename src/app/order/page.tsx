"use client"
import React from "react";
import OrderTable from "../components/order/OrderTable";
import NoSidebarLayout from "../components/layout/NoSidebarLayout";

const page = () => {
  return (
    <NoSidebarLayout>
      <div className="flex justify-center w-full h-[calc(100vh-58px)]">
        <div className="bg-white m-[26px] w-full flex flex-col shadow-xl">
          <div className="mt-[24px] text-[20px] text-primary text-center">
            Orders
          </div>
          <div className="w-[1073px] mx-auto">
            <div className="mt-[20px]">
              <OrderTable />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </NoSidebarLayout>
  );
};

export default page;
