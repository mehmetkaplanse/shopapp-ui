import axiosInstance from "@/utils/axiosInstance";
import { OrderRequest } from "../model/OrderRequest";

export default async function createOrder(formData: OrderRequest) {
    try {
      const response = await axiosInstance.post("/orders", formData);
      if(response.status === 200) 
        return response.data;
    } catch (error) {
      console.error("Error createing ordera:", error);
    }
  }