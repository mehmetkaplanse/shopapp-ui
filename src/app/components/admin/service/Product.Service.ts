import { CreateProductModel } from "@/app/components/admin/model/CreateProductModel";
import axiosInstance from "@/utils/axiosInstance";
import { UpdateProductModel } from "../model/UpdateProductModel";

export default async function getAllProducts () {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function createProduct(formBody: CreateProductModel) {
  try {
    const response = await axiosInstance.post("/products", formBody);
    if (response.status===200) {
      return true;
    }
  } catch (error) {
    console.error("Error create product:", error);
  }
}

export async function updateProduct(id: number, formBody: UpdateProductModel) {
    try {
      const response = await axiosInstance.put(`/products/${id}`, formBody)
      if (response.status===200) {
        return true;
      }
    } catch (error) {
      console.error("Error update product:", error);
    }
  }

export async function deleteProduct(id: number) {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      if (response.status===200) {
        return true;
      }
    } catch (error) {
      console.error("Error delete product:", error);
    }
  }