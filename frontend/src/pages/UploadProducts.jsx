import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
const UploadProducts = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    selling: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name);
  };

  return (
    <div className=" fixed bg-slate-200 bg-opacity-35  w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center text-lg">
          <h2 className="font-bold text-xl">Upload Products</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 "
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form action="" className="grid">
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;
