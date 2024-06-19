import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common";

const CategoryList = () => {
  const [categoryProduct, setCategory_Product] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductcategory = async () => {
    setLoading(true);
    const response = await axios.get(SummaryApi.category_Product.url, {
      withCredentials: "include",
    });

    if (response.data.success) {
      setCategory_Product(response.data.data);
      setLoading(false);
    }
  };
  console.log("category", categoryProduct);

  useEffect(() => {
    getProductcategory();
  }, []);

  return (
  <div className="container mx-auto p-4 ">

            <div className="flex items-center gap-2 justify-between overflow-scroll">
            {
                categoryProduct.map(
                    (product,index)=>{
                    return(
                        <div className="cursor-pointer">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white p-3 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={product.productImage[0]} alt={product.category} className="h-full objec-fill" />
                            </div>
                            <p className="text-center text-sm md:text-base capitalize">{product.category}</p>
                        </div>
                    )
                })
            }
            </div>

  </div>)
};

export default CategoryList;
