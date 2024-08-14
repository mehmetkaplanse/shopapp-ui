"use client";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchProducts, setSearchQueryFunc } from "@/redux/productsSlice";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  let { itemCount } = useSelector((state: RootState) => state.cart);
  const pathname = usePathname();
  const shouldShowSearch = pathname === "/" || pathname === "/products";
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<number | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    dispatch(setSearchQueryFunc(query));
  };

  useEffect(() => {
    setCurrentUser(Number(localStorage.getItem("currentUser")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };
  return (
    <div className="bg-primary w-full text-white sm:h-[51px] h-[60px] flex justify-between items-center">
      <div className="flex gap-1 sm:gap-4 items-center">
        <Link
          href={"/"}
          className="sm:ms-4 ms-1 font-semibold text-lg shadow-xl border px-2 rounded-full"
        >
          shopApp
        </Link>
        {shouldShowSearch && (
          <NavbarSearch
            searchQuery={searchQuery || ""}
            handleSearchChange={handleSearchChange}
          />
        )}
      </div>
      <div className="flex items-center gap-6 sm:me-8 me-3 relative">
        <div className="relative">
          <FiUser
            size={25}
            className="cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          />
          {isUserMenuOpen && (
            <div className="bg-white w-[174px] min-h-full rounded-xl absolute top-9 right-0 shadow-lg z-10 flex flex-col">
              <Link
                href="/order"
                className="px-4 py-2 hover:bg-gray-200 rounded-t-xl text-black h-full flex items-center"
              >
                Orders
              </Link>
              {!currentUser ? (
                <Link
                  href="/login"
                  className="px-4 py-2 hover:bg-gray-200 rounded-b-xl text-black h-full flex items-center"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  <Link
                    href="/admin"
                    className="px-4 py-2 hover:bg-gray-200 text-black h-full flex items-center"
                  >
                    Admin Panel
                  </Link>
                  <div
                    className="px-4 py-2 hover:bg-gray-200 rounded-b-xl text-black h-full flex items-center hover:cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <Link href="/cart" className="relative">
          <SlBasket size={25} className="cursor-pointer" />
          {itemCount !== null && itemCount !== undefined && itemCount > 0 && (
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
