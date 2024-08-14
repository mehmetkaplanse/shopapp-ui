import axiosInstance from "@/utils/axiosInstance";
import { RegisterRequest } from "../model/RegisterRequest";

export default async function signUp(formBody: RegisterRequest) {
  try {
    const response = await axiosInstance.post("/auth/register", formBody);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
