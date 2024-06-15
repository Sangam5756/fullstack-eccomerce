import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = () => {

  const user = useSelector(state => state?.user)

  
  console.log("header user",user)
  return (
    <header className="h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className=""><Link to={"/"}><Logo w={90} h={50}/></Link></div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 ">
          <input
            type="text"
            placeholder="search product here... "
            className="w-full outline-none "
          />
          <div className="text-lg min-w-[50px] h-9 bg-red-400 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* Right icons */}

        <div className="flex items-center gap-7">
          <div className="text-3xl  cursor-pointer">
            <FaUserCircle />
          </div>
          <div className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <p className="bg-red-500 text-xs absolute flex items-center justify-center h-5 w-5 rounded-full -top-2 -right-3">
              0
            </p>
          </div>

          {/* Login and logout buttons */}

          <div>
            <Link to="/login" className="px-3 text-white py-1  rounded-full bg-red-600 hover:bg-red-700 duration-300">
            Login
            </Link>
          </div>


        </div>
      </div>
    </header>
  );
};

export default Header;

