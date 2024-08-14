
import axiosInstance from "@/utils/axiosInstance";

export default async function getProductById (id: number) {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
