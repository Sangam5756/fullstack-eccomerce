import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayInrCurrency from "../helpers/DisplayCurreny";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editModel, setEditModel] = useState(false);

  return (
    <div className=" bg-white rounded p-4">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            width={120}
            height={120}
            alt=""
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-center text-ellipsis line-clamp-2">{data?.productName}</h1>
        <div>
          <p className="w-fit ml-auto mr-auto font-semibold">
            {DisplayInrCurrency(data.sellingPrice)}
          </p>
          <div
            onClick={() => setEditModel(true)}
            className="w-fit ml-auto p-2 bg-green-100 cursor-pointer hover:bg-green-600 rounded-full hover:text-white "
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {/* Edit Model Show */}
      {editModel && (
        <AdminEditProduct
          onClose={() => setEditModel(false)}
          editdata={data}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
