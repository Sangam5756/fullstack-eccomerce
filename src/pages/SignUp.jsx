import React, { useState } from "react";
import signinIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { Link, json, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { ImageToBase64 } from "../helpers/ImageToBase64";
import SummaryApi from "../common";
import axios from "axios"
import { toast } from "react-toastify";


const SignUp = () => {
  // Toogle For password show and hide
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    profilePic: "",
  });

  const navigate =useNavigate();

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageToBase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  console.log("Signup Data", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password === data.confirmedPassword){
      try {
        const response = await axios.post(SummaryApi.signUp.url, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(response.data.success){
          toast.success(response.data.message)
          navigate("/login");
        }
        if(response.data.error){
          toast.error(response.data.message)  
        }
        
        
        console.log("Response:", response.data);
  
      } catch (error) {
        console.error("Error:", error);
      }
    }else{
      console.log("password and confirmed password are not match")
    }
   
  };

  return (
    <section id="signup">
      <div className="container p-4 mx-auto">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || signinIcon} alt="signin-icon" />
            </div>

            <form action="">
              <label>
                <div className="text-xs bg-slate-200 pb-5 pt-2 cursor-pointer bottom-0 absolute w-full opacity-80  text-center">
                  upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            action=""
            className="mt-6 flex flex-col  gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              {/* username */}

              <label htmlFor="name">Username :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  required
                  placeholder="Enter Username"
                  className="w-full  h-full outline-none bg-transparent"
                  name="name"
                  value={data.name}
                  onChange={handleonChange}
                />
              </div>
            </div>

            <div>
              {" "}
              {/*Email  */}
              <label htmlFor="email">Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="w-full  h-full outline-none bg-transparent"
                  name="email"
                  value={data.email}
                  onChange={handleonChange}
                  required
                />
              </div>
            </div>

            {/*password*/}
            <div>
              <label htmlFor="password"> Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full  h-full outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleonChange}
                  required
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer text-xl"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/*ConFirmed password*/}

            <div>
              <label htmlFor="confirmPassword">Confirmed Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmedPassword ? "text" : "password"}
                  placeholder="Enter Confirmed Password"
                  className="w-full  h-full outline-none bg-transparent"
                  name="confirmedPassword"
                  value={data.confirmedPassword}
                  onChange={handleonChange}
                  required
                />
                <div
                  onClick={() => setShowConfirmedPassword((prev) => !prev)}
                  className="cursor-pointer text-xl"
                >
                  {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Signup
            </button>
          </form>

          <p className="mt-5">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" hover:text-red-700 hover:underline text-red-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
