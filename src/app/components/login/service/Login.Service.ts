import axiosInstance from "@/utils/axiosInstance";
import { LoginRequest } from "../model/LoginRequest";

export default async function login(formBody: LoginRequest) {
  try {
    const response = await axiosInstance.post("/auth/login", formBody);
    if (response) {
      localStorage.setItem("token",response.data.message)
      localStorage.setItem("currentUser",response.data.userId)
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
