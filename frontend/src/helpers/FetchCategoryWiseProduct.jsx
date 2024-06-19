import axios from 'axios'
import React from 'react'
import SummaryApi from '../common'

const FetchCategoryWiseProduct = async (category) => {

    const response = await axios.post(SummaryApi.categoryWise_Product.url, { category: category }, {
        withCredentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }

    });

    

    return response;
}

export default FetchCategoryWiseProduct