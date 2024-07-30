import axiosInstance from "@/utils/axiosInstance";

export default async function deleteProduct(id: number) {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    if (response.status===200) {
      return true;
    }
  } catch (error) {
    console.error("Error delete product:", error);
  }
}
