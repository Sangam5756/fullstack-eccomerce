import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";


const AdminProductCard = ({ data }) => {

  const [editModel, setEditModel] = useState(false);



  return (
    <div className=" bg-white rounded p-4">
      <img src={data?.productImage[0]} width={120} height={120} alt="" />
      <h1 className="text-center">{data?.productName}</h1>

      <div  className="w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white ">

      <MdModeEditOutline />


      </div>
      <AdminEditProduct/>
    </div>
    
  );
};

export default AdminProductCard;
