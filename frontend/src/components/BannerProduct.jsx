import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const DesktopImage = [image1, image2, image3, image4, image5];

  const DesktopMobileImage = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const handleRight = () => {
    if (DesktopImage.length - 1 > currentImage) {

      setCurrentImage((prev) => prev + 1);
    }

    
  }
  const handleLeft = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (DesktopImage.length - 1 > currentImage) {
        handleRight();
      } else {
        setCurrentImage(0)
      }

    }, 2000)
    return () => clearInterval(interval);
  },[currentImage]);

  return (
    <div className="container mx-auto px-4 rounded  ">
      <div className="h-60 md:h-72 w-full bg-slate-200 relative">

        <div className="absolute z-10 w-full h-full md:flex items-center hidden ">
          <div className="justify-between w-full flex text-2xl">
            <button onClick={handleLeft} className="bg-white rounded-full shadow-md p-1" ><FaAngleLeft /></button>
            <button onClick={handleRight} className="bg-white rounded-full shadow-md p-1"><FaAngleRight /></button>
          </div>
        </div>


        <div className="hidden md:flex h-full w-full overflow-hidden">
          {DesktopImage.map((imageUrl, index) => {
            return (
              <div
                className=" w-full h-full min-w-full min-h-full   duration-700"
                key={index}
                style={{ transform: `translateX(${-currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* mobile version */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {DesktopMobileImage.map((imageUrl, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full   duration-700"
                key={index}
                style={{ transform: `translateX(${-currentImage * 100}%)` }}
              >
                <img src={imageUrl} className="w-full h-full object-fill" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
