"use client";
import React from "react";
import { FieldValues, RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { FiUser, FiLock } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { RegisterRequest } from "./model/RegisterRequest";
import signUp from "./service/Register.Service";
import toast from "react-hot-toast";

const validationRules: Record<string, RegisterOptions<RegisterRequest>> = {
  username: {
    required: "Username is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 5,
      message: "Password must be at least 5 characters long",
    },
  },
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      const res = await signUp(data);
      if (res) {
        toast.success("Sign up successfully!");
        window.location.href = "/login";
      } else {
        toast.error("Please enter correct values!");
      }
    } catch (error) {
      toast.error("An error occurred while sending the post.");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-white rounded-2xl w-[377px] h-[544px] sm:mt-[121px] mt-[80px] shadow-xl mb-10">
        <div className="text-primary uppercase text-[32px] font-semibold mt-[67px]">
          REGISTER
        </div>

        {/* Username Input */}
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-8">
          <FiUser className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="text"
            placeholder="Username"
            className="outline-none w-full"
            {...register("username", validationRules.username)}
          />
        </div>
        {errors.username && (
          <span className="text-red-500 text-sm mt-1">{errors.username.message}</span>
        )}

        {/* Email Input */}
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-4">
          <MdEmail className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="email"
            placeholder="Email"
            className="outline-none w-full"
            {...register("email", validationRules.email)}
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
        )}

        {/* Password Input */}
        <div className="w-[258px] h-[52px] bg-white flex items-center border rounded-xl mt-4">
          <FiLock className="w-[30px] h-[29px] text-[#B9B9B9] mx-2" />
          <input
            type="password"
            placeholder="Password"
            className="outline-none w-full"
            {...register("password", validationRules.password)}
          />
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
        )}

        {/* Submit Button */}
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
