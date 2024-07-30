import { Product } from "@/app/products/model/Product";

export interface Category {
    id: number;
    name: string;
    products?: Product[];
}