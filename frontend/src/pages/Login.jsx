import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signinIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import axios from "axios";
import Context from "../context";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Password and emial input handling
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const Generalcontext = useContext(Context)

  // console.log("Contextprovider",Generalcontext.fetchUserDetails)

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };


  // Handle form when submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(SummaryApi.signIn.url, data, {
        withCredentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

      });

      // console.log(response)

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
        Generalcontext.fetchUserDetails()
        Generalcontext.fetchCountofProduct()
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }


    } catch (error) {
      console.log("error", error)
    }



  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white  p-5  w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={signinIcon} alt="login icons" />
          </div>

          <form action="" className="mt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="email">Email :</label>

              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleonChange}
                  className="w-full outline-none h-full bg-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password :</label>

              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleonChange}
                  className="w-full outline-none h-full bg-transparent"
                />
                <div onClick={() => setShowPassword((prev) => !prev)}>
                  <span className="cursor-pointer text-xl">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>


              <Link
                to="/forget-password"
                className=" block w-fit ml-auto hover:text-red-500 hover:underline "
              >
                Forget password ?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="mt-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" hover:text-red-700 hover:underline text-red-600"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
