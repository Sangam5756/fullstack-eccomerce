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

  const [data, setData] = useState(null);

  const fetchUserDetails = async () => {

    const dataResponse = await axios.get(SummaryApi.current_User.url, {
      withCredentials: 'include'
    });

    const data = dataResponse.data.data;

    if (dataResponse.data.success) {
      dispatch(setUserDetails(data));
    }
  };


  useEffect(() => {
    fetchUserDetails();

  }, [])


  return (
    <>

      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
