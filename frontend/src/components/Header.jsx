import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrSearch, GrToast } from "react-icons/gr";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/ROLE"
import Context from "../context";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import "./Dark.css"


const Header = () => {
  const user = useSelector((state) => state.user.user); // Ensure correct path
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation()
  const searchUrl = new URLSearchParams(searchInput?.search)
  const searchQuery = searchUrl.getAll("q")

  const [search ,setSearch] = useState(searchQuery);
  const [dark, setDark] = useState(
    () => localStorage.getItem("dark-mode") === "true"
  );
  
  const handleLogut = async () => {
    const fetchData = await axios.get(SummaryApi.user_Logout.url, {
      withCredentials: "include",
    });
    
    


    if (fetchData.data.success) {
      dispatch(setUserDetails(null));
      toast.success(fetchData.data.message);
      navigate("/")
    }
    if (fetchData.data.error) {
      toast.error(fetchData.data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)

    } else {
      navigate("/search")
    }
  }

  useEffect(() => {
    document.body.classList.toggle("dark-mode", dark);
    localStorage.setItem("dark-mode", dark);
  }, [dark]);


  return (
    <header className="h-16 w-full shadow-md bg-white fixed z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 ">
          <input
            type="text"
            value={search}
            placeholder="search product here... "
            className="w-full outline-none "
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-9 bg-red-400 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* Right icons */}

        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">

          <div
              className="text-4xl cursor-pointer relative flex items-center px-2 justify-center"
              onClick={() => setDark((prev) => !prev)}
            >
              {dark ? <MdDarkMode /> : <MdLightMode />}
            </div>


          
            {user?._id
              &&
              (
                <div className="text-3xl  cursor-pointer relative flex justify-center " onClick={() => { setMenuDisplay((prev) => !prev) }}>
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full text-sm"
                      alt={user?.name}
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
              )
            }
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded  ">
                <nav>
                  {user?.role === ROLE.ADMIN
                    && (<Link onClick={() => { setMenuDisplay((prev) => !prev) }} to={"/admin-panel/all-products"} className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block">Admin Panel</Link>)
                  }
                </nav>
              </div>
            )}
          </div>
          {
            user?._id && (
              <Link to={"/cart"} className="text-2xl relative">
                <span>
                  <FaShoppingCart />
                </span>
                <p className="bg-red-500 text-xs absolute flex items-center justify-center h-5 w-5 rounded-full -top-2 -right-3">
                  {context.cartProductCount}
                </p>
              </Link>
            )
          }

          {/* Login and logout buttons */}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogut}
                className="px-3 text-white py-1  rounded-full bg-red-600 hover:bg-red-700 duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 text-white py-1  rounded-full bg-red-600 hover:bg-red-700 duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
