"use client";
import React from "react";
import OrderTable from "../components/order/OrderTable";
import NoSidebarLayout from "../components/layout/NoSidebarLayout";

const Page = () => {
  return (
    <NoSidebarLayout>
      <div className="flex justify-center md:w-full h-[calc(100vh-58px)] mx-3 md:mx-0">
        <div className="bg-white m-8 sm:m-6 md:m-8 lg:m-[26px] w-full max-w-full flex flex-col shadow-xl">
          <div className="mt-6 md:mt-8 lg:mt-[24px] text-lg md:text-xl lg:text-[20px] text-primary text-center">
            Orders
          </div>
          <div className="w-full px-4 sm:px-6 md:px-8 lg:w-[1073px] mx-auto md:overflow-x-hidden overflow-x-auto">
            <div className="mt-5 md:mt-6 lg:mt-[20px]">
              <OrderTable />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </NoSidebarLayout>
  );
};

export default Page;
