import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';


const Cart = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(SummaryApi.view_addtoCart.url, {
            withCredentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        })


        console.log(response)

        if(response?.data.success){

            setData(response?.data?.data)
        
        }
        // loading(false);

    }
    console.log("cartData",data)

    useEffect(()=>{
        fetchData();
    },[])


    return (
        <div className='container mx-auto '>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 & !loading && (
                        <p className='bg-white py-5'>No Product in Cart</p>
                    )
                }
            </div>


            <div>
                {/* View Product */}
                    <div className='w-full max-w-3xl'>
                        {
                            loading ? (
                                <div className='w-full bg-slate-300 h-32 my-1 border-slate-300 animate-pulse rounded '>

                                </div>
                            ):(
                                <div></div>
                            )
                        }
                    </div>
                
            </div>
            

        </div>
    )
}

export default Cart