import React, { useState } from "react";
import  {Link} from "react-router-dom"
import signinIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white  p-5  w-full max-w-sm mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={signinIcon} alt="login icons" />
          </div>

          <form action="" className="mt-6">
            <div className="grid">
              <label htmlFor="email">Email :</label>

              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
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
                  className="w-full outline-none h-full bg-transparent"
                />
                <div onClick={() => setShowPassword((prev) => (!prev))}>
                  <span
                    className="cursor-pointer text-xl"
                    
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>


              <Link to="/forget-password" className=" block w-fit ml-auto hover:text-red-500 hover:underline " >
              Forget  password</Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">Login</button>
          </form>
          <p className="mt-5">Don't have account ? <Link to={"/sign-up"} className=" hover:text-red-700 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
