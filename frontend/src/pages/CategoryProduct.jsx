import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCategory from "../helpers/ProductCategory";
import axios from "axios";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectedCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortby, setSortby] = useState("");
  const navigate = useNavigate();

  console.log(sortby)

  const fetchdata = async () => {
    const response = await axios.post(
      SummaryApi.filter_product.url,
      { category: filterCategoryList },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    setData(response?.data?.data || []);
  };

  const handleselectcategory = (e) => {
    const { name, value, checked } = e.target;

    console.log(name, value, checked);
    setSelectedCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };


  useEffect(() => {
    fetchdata();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }

        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    // for the  format url change from checkbox of category
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);


  const handlesortBy = (e) => {
    setSortby(e.target.value);

    if (sortby === "asc") {
      setData(prev => prev.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
    
    if (sortby === "dsc") {
      setData(prev => prev.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }


  }
  return (
    <div className="container mx-auto p-4">
      {/* Desktop Version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className=" bg-white p-2 min-h-[calc(100vh-155px)] overflow-y-scroll">
          {/*Sory By  */}
          <div className="">
            <h3 className="text-lg uppercase  font-medium text-slate-500 border-b pb-2  border-slate-300">
              Sort By
            </h3>

            <form className="text-sm  flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sort" id="sort1" value={"asc"} onChange={handlesortBy} />
                <label htmlFor="sort1 ">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3 ">
                <input type="radio" name="sort" id="sort" value={"dsc"} onChange={handlesortBy} />
                <label htmlFor="sort">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/*filter By  */}
          <div className="">
            <h3 className="text-lg uppercase  font-medium text-slate-500 border-b pb-2  border-slate-300">
              Sort By
            </h3>

            <form className="text-sm  flex flex-col gap-2 py-2">
              {ProductCategory.map((catergories, index) => {
                return (
                  <div className="flex  items-center  gap-2">
                    <input
                      type="checkbox"
                      name="category"
                      id={catergories?.value}
                      checked={selectCategory[catergories?.value]}
                      value={catergories?.value}
                      onChange={handleselectcategory}
                    />
                    <label htmlFor={catergories?.value}>
                      {catergories?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div className="px-4">
          <p className=" font-medium text-slate-800  text-lg my-2">Search Results : {data?.length}</p>
          {/* right side */}
          <div className="max-h-[calc(100vh-155px)] min-h-[calc(100vh-155px)] overflow-y-scroll">
            {data?.length !== 0 && (
              <VerticalCard loading={loading} data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
