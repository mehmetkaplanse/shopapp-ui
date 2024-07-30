import axiosInstance from "@/utils/axiosInstance";
import { UpdateProductModel } from "../model/UpdateProductModel";

export default async function updateProduct(id: number, formBody: UpdateProductModel) {
  try {
    const response = await axiosInstance.put(`/products/${id}`, formBody)
    if (response.status===200) {
      return true;
    }
  } catch (error) {
    console.error("Error update product:", error);
  }
}
