import axiosInstance from "@/utils/axiosInstance";

export default async function getProductById(id: number) {
  try {
    const response = await axiosInstance.get(`/categories/${id}`);
    if (response.status===200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetch category:", error);
  }
}
