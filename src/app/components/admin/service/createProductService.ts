import { CreateProductModel } from "@/app/components/admin/model/CreateProductModel";
import axiosInstance from "@/utils/axiosInstance";

export default async function createProduct(formBody: CreateProductModel) {
  try {
    const response = await axiosInstance.post("/products", formBody);
    if (response.status===200) {
      return true;
    }
  } catch (error) {
    console.error("Error create product:", error);
  }
}
