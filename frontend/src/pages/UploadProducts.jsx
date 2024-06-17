import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ProductCategory from "../helpers/ProductCategory.jsx";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helpers/UploadImage.jsx";
import DisplayImage from "../components/DisplayImage.jsx";

const UploadProducts = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [Imageurl,setImageUrl] = useState("")
  


  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleUploadProducts = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await UploadImage(file);
    

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.data.url],
      };
    });
  };

  return (
    <div className=" fixed bg-slate-200 bg-opacity-35  w-full h-full top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]  overflow-hidden ">
        <div className="flex justify-between items-center text-lg pb-3">
          <h2 className="font-bold text-xl">Upload Products</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 "
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form action="" className="grid p-4 gap-2 overflow-scroll h-full mb-5">
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded "
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleChange}
            className="p-2 bg-slate-100 border rounded "
          />
          <label htmlFor="category" className="mt-3">
            Category :
          </label>

          <select
            name="category"
            id="category"
            value={data.category}
            className="p-2 bg-slate-100 border rounded "
            onChange={handleChange}
          >
            {ProductCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>

          <label htmlFor="uploadProduct">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer ">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Products</p>
                <input
                  type="file"
                  name="uploadProduct"
                  id="uploadProduct"
                  className="hidden"
                  onChange={handleUploadProducts}
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div
                className="flex items-center gap-2
              "
              >
                {data.productImage.map((el) => {
                  return (
                    <img
                      src={el}
                      alt="img"
                      height={80}
                      width={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={()=>{setFullScreenImage(true),setImageUrl(el)}}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-red-500 text-sm">
                {" "}
                * Please Upload Product Image
              </p>
            )}
          </div>

          <button className="text-white bg-red-600 px-3 py-2 mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>


      {/* Display Image Full Screen */}

     { fullScreenImage &&( <DisplayImage onClose={() => setFullScreenImage((prev) =>!prev)} imgUrl={Imageurl}/>)
     }
    </div>
  );
};

export default UploadProducts;
