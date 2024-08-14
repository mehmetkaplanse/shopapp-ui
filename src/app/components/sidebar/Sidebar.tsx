"use client";
import React, { useEffect, useState } from "react";
import { Category } from "./model/Category";
import getAllCategories from "./service/Category.Service";
import { useDispatch } from "react-redux";
import { toggleCategory } from "@/redux/productsSlice";

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  const handleCategoryChange = (categoryId: number) => {
    dispatch(toggleCategory(categoryId));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white sm:w-[176px] my-8 sm:my-0">
      <div className="flex flex-col justify-center sm:ms-0 ms-4">
        <div className="mt-[16px] ms-2 text-primary sm:text-md text-lg">Filtre</div>
        <div className="mt-[20px] ms-2">
          {categories.map((cat, i) => (
            <div className="flex items-center gap-2" key={cat?.id}>
              <input
                type="checkbox"
                name={cat.name}
                id={cat.name}
                onChange={() => handleCategoryChange(cat.id)}
              />
              <div className="sm:text-md text-lg">{cat?.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
