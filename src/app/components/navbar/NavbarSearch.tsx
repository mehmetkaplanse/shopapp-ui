import React, { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

interface NavbarSearchProps {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  handleSearchChange,
  searchQuery,
}) => {
  return (
    <div className="w-[166px] h-[34px] bg-white rounded-xl flex items-center gap-1 ms-[10px]">
      <CiSearch size={25} color="#00000014" className="ms-1" />
      <input
        type="text"
        value={searchQuery || ""}
        onChange={handleSearchChange}
        placeholder="Search"
        className="w-[88px] h-[20px] text-black text-sm outline-none"
      />
    </div>
  );
};

export default NavbarSearch;
