import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SummaryApi from "../common";

const CategoryList = () => {
  const [categoryProduct, setCategory_Product] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

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
  

  useEffect(() => {
    getProductcategory();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex items-center gap-2 justify-between overflow-scroll scrollbar-none">
        {loading ? (
         
            
                categoryLoading.map((el,index) =>{
                    return (
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200  animate-ping" key={"categoryLoading"+index}></div>        
                    )
                })
            
        ) : (
          categoryProduct.map((product, index) => {
            return (
              <Link key={product?.category+index}
                to={"product-category/" + product?.category}
                className="cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 p-4 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    alt={product.category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-110 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product.category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}; 

export default CategoryList;
