"use client";
import Link from "next/link";
import React from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { LoginRequest } from "./model/LoginRequest";
import login from "./service/Login.Service";
import toast from "react-hot-toast";

const validationRules: Record<string, RegisterOptions<LoginRequest>> = {
  username: {
    required: "Username is required",
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 5,
      message: "Password must be at least 5 characters long",
    },
  },
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: "onBlur",
  });
  const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
    try {
      if (data.username.trim() !== "" && data.password.trim() !== "") {
        const res = await login(data);
        if (res) {
          toast.success("Sign in successfully!");
          window.location.href = "/";
        } else {
          toast.error("Incorrect username or password!");
        }
      } else {
        toast.error("Please enter required fields!");
      }
    } catch (error) {
      toast.error("An error occurred while sending the post.");
    }
  };

  return (
    <div className="flex justify-center sm:h-full h-screen">
      <form className="flex flex-col items-center bg-white rounded-2xl w-[383px] h-[487px] sm:mt-[105px] mt-[80px] shadow-xl mb-10">
        <div className="text-primary uppercase text-[32px] font-semibold mt-[67px]">
          WELCOME
        </div>
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-8">
          <FiUser className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            {...register("username", validationRules.username)}
            type="text"
            placeholder="Username"
            className="outline-none"
          />
        </div>
        {errors.username && (
          <span className="text-red-500 text-sm mt-1">{errors.username.message}</span>
        )}
        <div className="w-[258px] h-[52px] bg-white flex items-center justify-center border rounded-xl mt-4">
          <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            {...register("password", validationRules.password)}
            type="password"
            placeholder="Password"
            className="outline-none"
          />
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
        )}
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
