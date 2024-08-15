import { RegisterOptions } from "react-hook-form";
import { CreateProductModel } from "@/app/components/admin/model/CreateProductModel";

export const productNameValidation: RegisterOptions<CreateProductModel, "name"> = {
  required: "Product name is required",
  minLength: {
    value: 2,
    message: "Product name must be at least 2 characters",
  },
  maxLength: {
    value: 50,
    message: "Product name must be at most 50 characters",
  },
};

export const priceValidation: RegisterOptions<CreateProductModel, "price"> = {
  required: "Price is required",
  min: {
    value: 0.01,
    message: "Price must be a positive number",
  },
};

export const categoryValidation: RegisterOptions<CreateProductModel, "category_id"> = {
  required: "Category is required",
};

export const explanationValidation: RegisterOptions<CreateProductModel, "explanation"> = {
  maxLength: {
    value: 500,
    message: "Explanation must be at most 500 characters",
  },
};
