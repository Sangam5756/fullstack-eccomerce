import React, { useEffect, useRef, useState } from "react";
import FetchCategoryWiseProduct from "../helpers/FetchCategoryWiseProduct";
import DisplayInrCurrency from "../helpers/DisplayCurreny";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
 
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }
 
  const fetchData = async () => {
    setLoading(true);
    const categotyProduct = await FetchCategoryWiseProduct(category);

    setData(categotyProduct.data.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container mx-auto px-4 my-4   relative ">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="flex items-center gap-4 md:gap-6 overflow-scroll  scrollbar-none  transition-all" ref={scrollElement}>
        {/* left right buttons  */}
        <div className="hidden md:block">
          <button className="bg-white rounded-full shadow-md p-1 absolute left-0  text-lg" onClick={scrollLeft} ><FaAngleLeft /></button>
          <button className="bg-white rounded-full shadow-md p-1 absolute right-0 text-lg" onClick={scrollRight}><FaAngleRight /></button>
        </div>

        {/* displaying product data */}
        {
            loading ?  (loadingList.map((product, index) => {
                return (
      
                  <div className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow  ">
                    <div className="bg-slate-300 h-48 p-4 min-w-[280px]  md:min-w-[145px] flex justify-center items-center animate-pulse">
                    </div>
      
                    <div className="p-4 grid gap-3 ">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis text-black line-clamp-1 p-2 capitalize bg-slate-200 animate-pulse rounded-full"></h2>
                      <p className="capitalize text-slate-500 p-2  bg-slate-200 animate-pulse rounded-full "></p>
                      <div className="flex gap-3 w-full">
                        <p className="text-red-600 font-medium p-2  bg-slate-200 animate-pulse rounded-full w-full"></p>
                        <p className=" text-slate-500 line-through p-1  bg-slate-200 animate-pulse rounded-full w-full"></p>
                      </div>
                      <button className=" text-white px-3 py-4  bg-slate-300 rounded-full animate-pulse"></button>
                    </div>
                  </div>
                );
              })):

        
        data.map((product, index) => {
          return (

            <Link to={"/product/"+product?._id} className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow  ">
              <div className="bg-slate-200 h-48 p-4 min-w-[280px]  md:min-w-[145px] flex justify-center items-center">
                <img src={product?.productImage[0]} alt="" className=" object-scale-down h-full hover:scale-105 duration-200 mix-blend-multiply" />
              </div>

              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis text-black line-clamp-1 capitalize">{product.productName}</h2>
                <p className="capitalize text-slate-500 ">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">{DisplayInrCurrency(product?.sellingPrice)}</p>
                  <p className=" text-slate-500 line-through">{DisplayInrCurrency(product?.price)}</p>
                </div>
                <button className="bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-1 rounded-full">Add to Cart</button>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default VerticalCardProduct;
