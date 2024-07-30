import axiosInstance from "@/utils/axiosInstance";


export default async function getAllProducts () {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
