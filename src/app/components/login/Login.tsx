"use client"
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { LoginRequest } from "./model/LoginRequest";
import login from "./service/Login.Service";
import toast from "react-hot-toast";


const Login = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      if (data.username.trim() !== "" && data.password.trim() !== "") {
        console.log(data,"dataaa");
        
        const res = await login(data);
        if(res) {
          toast.success("Sign in successfully!");
          window.location.href = "/"
        }
        else {
          toast.error("Incorrect username or password!");
        }
      }
      else {
        toast.error("Please enter required fields!");
      }
    } catch (error) {
      toast.error("An error occurred while sending the post.");
    }
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col items-center bg-white rounded-2xl w-[383px] h-[487px] mt-[105px] shadow-xl">
        <div className="text-primary uppercase text-[32px] font-semibold mt-[67px]">
          WELCOME
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-8">
          <FiUser className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="outline-none"
          />
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-4">
          <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="outline-none"
          />
        </div>
        <button
          className="w-[258px] h-[52px] bg-primary rounded-xl text-white text-[32px] font-semibold mt-12"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          LOGIN
        </button>
        <div className="mt-6 text-sm">
          Not a member?
          <Link href="/register" className="text-primary">
            {" "}
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
