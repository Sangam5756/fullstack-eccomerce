import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import axios from "axios"
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch()
  const userDetails = async () => {

    const dataResponse = await axios.get(SummaryApi.current_User.url, {
      withCredentials: 'include'
    });

    console.log("app", dataResponse.data.data)


    if (dataResponse.data.success) {
      dispatch(setUserDetails(dataResponse.data.data));
    }


  };

  useEffect(() => {
    userDetails();

  }, [])


  return (
    <>
      <Context.Provider value={{ userDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
