import React, { useEffect, useState } from "react";
import UploadProducts from "./UploadProducts";
import axios from "axios";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import AdminProductCard from "../components/AdminProductCard.jsx";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await axios.get(SummaryApi.get_Product.url, {
      withCredentials: "include",
    });

    // console.log(response);
    if (response.data.success) {
      setAllProduct(response.data.data);
    }

    if (response.data.error) {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white px-3 py-3 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          onClick={() => setOpenUploadProduct((prev) => !prev)}
          className="border-2 border-red-600 text-red-500 px-3 py-1 hover:bg-red-700 hover:text-white rounded-full duration-200">Upload Product</button>
      </div>

      {/* All Products */}
      <div className="flex items-center flex-wrap gap-5 py-4   h-[calc(100vh-190px)] overflow-y-scroll ">
        {allProduct.map((product, index) => {return <AdminProductCard data={product} key={index + "allProduct"} fetchdata ={fetchAllProduct} />;})}
      </div>

      {/* Upload product components */}
      {openUploadProduct && (
        <UploadProducts onClose={() => setOpenUploadProduct((prev) => !prev)} fetchdata ={fetchAllProduct}/>
      )}
    </div>
  );
};

export default AllProducts;
