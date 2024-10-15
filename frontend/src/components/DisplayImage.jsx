import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center ">

      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
      <div
            className="w-fit ml-auto text-2xl hover:text-red-600 "
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        <div className="flex justify-center p-6 w-full h-full max-h-[80vh] max-w-[80vw]">
          <img src={imgUrl} className="max-h-[100vh] w-full max-w-[100vw]"  />
        </div>


      </div>


    </div>
  );
};

export default DisplayImage;
