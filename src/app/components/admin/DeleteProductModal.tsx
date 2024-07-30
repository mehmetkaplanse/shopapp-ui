import React from "react";
import deleteProduct from "./service/deleteProductService";
import toast from "react-hot-toast";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteProductId: number | null;
  fetchProducts: () => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  isOpen,
  onClose,
  deleteProductId,
  fetchProducts
}) => {

  const handleDeleteProduct = async () => {
    if(deleteProductId) {
      const res = await deleteProduct(deleteProductId);
      if(res) {
        onClose();
        fetchProducts()
        toast.success('Product deleted successfully.');
      }
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-10 rounded-lg w-[350px] h-[200px] relative">
        <div>Are you sure you want to delete this product ?</div>
        <div className="absolute bottom-4 right-4 flex space-x-4">
          <button className="px-4 py-2 border border-primary text-primary rounded-full text-sm ms-4" onClick={onClose}>
            Cancel
          </button>
          <button  className="px-4 py-2 bg-primary text-white rounded-full text-sm" onClick={handleDeleteProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
