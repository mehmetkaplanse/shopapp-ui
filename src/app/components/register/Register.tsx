"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { RegisterRequest } from "./model/RegisterRequest";
import signUp from "./service/Register.Service";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterRequest>();
  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      if (data.username.trim() !== "" && data.password.trim() !== "") {
        const res = await signUp(data);
        if (res) {
          toast.success("Sign up successfully!");
          window.location.href = "/login";
        } else {
          toast.error("Please enter correct values!");
        }
      } else {
        toast.error("Please enter required fields!");
      }
    } catch (error) {
      toast.error("An error occurred while sending the post.");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-white rounded-2xl w-[377px] h-[544px] mt-[121px] shadow-xl">
        <div className="text-primary uppercase text-[32px] font-semibold mt-[67px]">
          REGISTER
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-8">
          <FiUser className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="text"
            placeholder="Username"
            className="outline-none"
            {...register("username")}
          />
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-6">
          <MdEmail className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="outline-none"
          />
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-6">
          <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="outline-none"
          />
        </div>
        <button
          className="w-[258px] h-[52px] bg-primary rounded-xl text-white text-[32px] font-semibold mt-12"
          onClick={handleSubmit(onSubmit)}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Register;
