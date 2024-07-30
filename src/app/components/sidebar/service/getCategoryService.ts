import axiosInstance from "@/utils/axiosInstance";


export default async function getAllCategories () {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
