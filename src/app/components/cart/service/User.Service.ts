import axiosInstance from "@/utils/axiosInstance";

export default async function getUserById(id: number) {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      if(response.status === 200) 
        return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }