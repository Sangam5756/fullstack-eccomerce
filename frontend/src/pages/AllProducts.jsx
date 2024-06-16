import React, { useState } from "react";
import UploadProducts from "./UploadProducts";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div>
      <div className="bg-white px-3 py-3 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct((prev) => !prev)}
          className="border-2 border-red-600 text-red-500 px-3 py-1 hover:bg-red-700 hover:text-white rounded-full duration-200"
        >
          Upload Product
        </button>
      </div>
      {/* Upload product components */}
      {openUploadProduct && (
        <UploadProducts onClose={() => setOpenUploadProduct((prev) => !prev)} />
      )}
    </div>
  );
};

export default AllProducts;
