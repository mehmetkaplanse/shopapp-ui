"use client";
import React, { useEffect, useState } from "react";
import { Category } from "./model/Category";
import getAllCategories from "./service/getCategoryService";

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  return (
    <div className="bg-white w-[176px]">
      <div className="mt-[16px] ms-[18px] text-primary">Filtre</div>
      <div className="mt-[24px] ms-2">
        {categories.map((cat, i) => (
          <div className="flex items-center gap-2" key={cat?.id}>
            <input type="checkbox" name="" id="" />
            <div className="text-sm">{cat?.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
