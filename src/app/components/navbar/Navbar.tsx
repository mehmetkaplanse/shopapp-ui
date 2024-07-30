"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const router = useRouter()
  let { itemCount } = useSelector((state: RootState) => state.cart);
  const pathname = usePathname();
  const shouldShowSearch = pathname === "/" || pathname === "/products";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>("");

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (searchQuery?.trim()) {
  //     router.push(`/search?query=${searchQuery}`);
  //   }
  // };
  useEffect(() => {
    
  })
  return (
    <div className="bg-primary w-full text-white h-[51px] flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link
          href={"/"}
          className="ms-4 font-semibold text-lg shadow-xl border px-2 rounded-full"
        >
          shopApp
        </Link>
        {shouldShowSearch && (
          <div className="w-[166px] h-[34px] bg-white rounded-xl flex items-center gap-1 ms-[10px]">
            <CiSearch size={25} color="#00000014" className="ms-1" />
            <input
              type="text"
              defaultValue={searchQuery || ""}
              placeholder="Search"
              className="w-[88px] h-[20px] text-black text-sm outline-none"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 me-8 relative">
        <div className="relative">
          <FiUser
            size={25}
            className="cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          />
          {isUserMenuOpen && (
            <div className="bg-white w-[174px] h-[96px] rounded-xl absolute top-9 right-0 shadow-lg z-10 flex flex-col">
              <Link
                href="/login"
                className="px-4 py-2 hover:bg-gray-200 rounded-t-xl text-black h-full flex items-center"
              >
                Sign In
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 hover:bg-gray-200 rounded-b-xl text-black h-full flex items-center"
              >
                Siparişlerim
              </Link>
            </div>
          )}
        </div>
        <Link href="/cart" className="relative">
          <SlBasket size={25} className="cursor-pointer" />
          {itemCount > 0 && (
            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
