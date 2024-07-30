import axiosInstance from "@/utils/axiosInstance";
import { Login } from "../model/Login";

export default async function login(formBody: Login) {
  try {
    const response = await axiosInstance.post("/user", formBody);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
