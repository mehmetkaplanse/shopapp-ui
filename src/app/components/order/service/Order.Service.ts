import axiosInstance from "@/utils/axiosInstance";

export default async function getAllOrders() {
  try {
    const response = await axiosInstance.get("/orders");
    if(response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

export async function deleteOrderById(id: number) {
  try {
    const response = await axiosInstance.delete(`/orders/${id}`);
    if(response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error delete order:", error);
  }
}
