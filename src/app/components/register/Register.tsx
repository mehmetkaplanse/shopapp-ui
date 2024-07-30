import React from "react";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-white rounded-2xl w-[377px] h-[544px] mt-[121px] shadow-xl">
        <div className="text-primary uppercase text-[32px] font-semibold mt-[67px]">
          REGISTER
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-8">
          <FiUser className="w-[30px] h-[29px] text-[#B9B9B9] mx-2"/>
          <input type="text" placeholder="Username" className="outline-none" />
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-6">
            <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2"/>
          <input type="password" placeholder="Password" className="outline-none" />
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-6">
            <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2"/>
          <input type="password" placeholder="Rewrite Password" className="outline-none" />
        </div>
        <button className="w-[258px] h-[52px] bg-primary rounded-xl text-white text-[32px] font-semibold mt-12">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Register;
