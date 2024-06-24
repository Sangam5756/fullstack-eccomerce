import axios from "axios";
import { MdDelete } from "react-icons/md";

import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import { DisplayInrCurrency } from "../helpers/DisplayCurreny";
import Context from "../context";

const Cart = () => {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const Generalcontext = useContext(Context);
    const loadingCart = new Array(Generalcontext.cartProductCount).fill(null);

    const fetchData = async () => {
        // setLoading(true);
        const response = await axios.get(SummaryApi.view_addtoCart.url, {
            withCredentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("cartrespone", response)
        if (response?.data.success) {
            setData(response?.data?.data);
        }
        // setLoading(false);
    };



    const handleloading = async () => {
        await fetchData();
    }

    useEffect(() => {
        setLoading(true)
        handleloading();
        setLoading(false)
    }, []);





    const increaseQty = async (id, qty) => {
        const response = await axios.post(SummaryApi.update_addtoCart.url, {
            _id: id,

            quantity: qty + 1
        }, {
            withCredentials: 'include',
            headers: {
                "Content-Type": "Application/json"
            }
        })

        if (response.data.success) {
            fetchData()
        }

        console.log(response)
    }
    const decreaseQty = async (id, qty) => {
        const response = await axios.post(SummaryApi.update_addtoCart.url, {
            _id: id,
            quantity: qty - 1
        }, {
            withCredentials: 'include',
            headers: {
                "Content-Type": "Application/json"
            }
        })
        console.log(response)
        if (response.data.success) {
            fetchData()
        }



    }
    const deleteCartProduct = async (id) => {
        const response = await axios.post(SummaryApi.delete_addtoCart.url, {
            _id: id,

        }, {
            withCredentials: 'include',
            headers: {
                "Content-Type": "Application/json"
            }
        })

        console.log(response)
        if (response.data.success) {
            fetchData()
            Generalcontext.fetchCountofProduct()
        }
    }



    const totalQty = data.reduce((previouseValue, currentValue) => previouseValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((previouseValue, currentValue) => previouseValue + (currentValue.quantity * currentValue.productId?.sellingPrice), 0);



    return (

        <div className="container mx-auto ">
            <div className="text-center text-lg my-3">
                {

                    data.length === 0 && (
                        <p className="bg-white py-5">No Data</p>
                    )
                }
            </div>


            <div className="flex  flex-col lg:flex-row gap-10 lg:justify-between">
                {/* View Product */}
                <div className="w-full max-w-3xl p-4">
                    {loading
                        ? loadingCart.map((el) => {
                            return (
                                <div className="w-full bg-slate-300 h-32 my-2 border-slate-300 animate-pulse rounded "></div>
                            );
                        })
                        : data.map((product, index) => {
                            return (
                                <div
                                    key={product?.productId?.productId}
                                    className="w-full bg-slate-200 h-32 my-2 border-slate-300  rounded grid grid-cols-[128px,1fr] "
                                >
                                    <div className="w-32 h-32 bg-slate-300">
                                        <img
                                            src={product.productId?.productImage[0]}
                                            alt=""
                                            className="w-full h-full  object-scale-down mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="px-4 py-2 relative">
                                        <div onClick={() => deleteCartProduct(product?._id)} className="absolute right-0 text-red-600 rounded-full   p-2 hover:bg-red-600 hover:text-white">
                                            <MdDelete />

                                        </div>
                                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                                            {product?.productId?.productName}
                                        </h2>
                                        <p className=" capitalize text-slate-500">
                                            {product?.productId?.category}
                                        </p>
                                        <div className=" flex  justify-between items-center ">
                                            <p className="text-red-600 font-medium text-lg">{DisplayInrCurrency(product?.productId?.sellingPrice)}</p>

                                            <p className="text-slate-400 font-medium text-lg">{DisplayInrCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className="flex items-center mt-1">
                                            <button onClick={() => decreaseQty(product?._id, product.quantity)} className="border border-red-600 text-red-500  h-6 w-6 rounded flex items-center justify-center hover:bg-red-600 hover:text-white">
                                                -
                                            </button>
                                            <span>&nbsp;&nbsp;{product.quantity} &nbsp;&nbsp;</span>
                                            <button onClick={() => increaseQty(product?._id, product.quantity)} className=" border border-red-600 text-red-500 h-6 w-6  flex items-center justify-center rounded hover:bg-red-600 hover:text-white">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* Summary */}
                <div className="mt-5 lg:mt-0 w-full max-w-sm p-4 ">
                    {loading ? (
                        <div className=" h-36 bg-slate-200 border border-slate-300 animate-pulse">

                        </div>
                    ) : (

                        <div className=" h-36 bg-white">
                            <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>

                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>

                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p>Total Price</p>
                                <p>{DisplayInrCurrency(totalPrice)}</p>
                            </div>

                            <button className="bg-blue-600 p-2 text-white w-full">Payments</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cart;
