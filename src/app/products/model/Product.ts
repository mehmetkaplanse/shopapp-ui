import { Category } from "@/app/components/sidebar/model/Category";

export interface Product {
    id: number;
    name: string;
    price: number;
    explanation: string;
    image: string;
    category_id: number;
}