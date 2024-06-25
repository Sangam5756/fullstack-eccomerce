import axios from 'axios';
import React from 'react'
import SummaryApi from '../common';
import { toast } from "react-toastify"

const addToCart = async (e, id) => {
    // e.stopPropagation();
    e.preventDefault();

    const response = await axios.post(SummaryApi.addtoCart.url,{productId : id}, {
        withCredentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    });

    // console.log(response)
    if (response.data.success) {
        toast.success(response.data.message)
    }
    if (response.data.error) {
        toast.error(response.data.message)
    }

return response.data;


}

export default addToCart;