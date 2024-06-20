import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from 'react-icons/fa'
import { FaStarHalf } from 'react-icons/fa6'
import DisplayInrCurrency from '../helpers/DisplayCurreny'

const ProductDetails = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  })
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);

  const [activeImage, setActiveImage] = useState("")


  const fetchDetails = async () => {
    setLoading(true);
    const response = await axios.post(SummaryApi.Product_Details.url, { Productid: params?.id }, {
      withCredentials: 'include',
      headers: { "content-type": "application/json" }
    })
    setData(response.data.data);
    setActiveImage(response?.data?.data?.productImage[0])
    setLoading(false);
  }
  console.log(data)

  useEffect(() => {

    fetchDetails();
  }, [])

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl)


  }

  return (
    <div className='container  mx-auto p-4'>

      {/* Product Image */}
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4 '>
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='lg:h-96 lg:w-96 h-[300px] w-[300px]  bg-slate-200'>
            <img src={activeImage} alt="" className='h-full w-full object-scale-down  mix-blend-multiply' />
          </div>

          <div className='h-full'>
            {

              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading?.map(el => {
                      return (

                        <div className='h-20 w-20 bg-slate-300 rounded animate-pulse'  ></div>
                      )
                    })
                  }
                </div>


              )
                :
                (
                  <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imageurl, index) => {
                        return (

                          <div className='h-20 w-20 bg-slate-300 rounded p-1' key={imageurl}>
                            <img src={imageurl} alt="image" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imageurl)} onClick={() => handleMouseEnterProduct(imageurl)} />
                          </div>

                        )
                      })
                    }
                  </div>

                )
            }
          </div>
        </div>

        {/* Product details*/}
        <div className='flex flex-col gap-1'>
          <p className=' bg-red-200  text-red-600 px-2  rounded-full inline-block w-fit'> {data?.brandName}</p>
          <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
          <p className='capitalize text-slate-400'>{data?.category}</p>
          <div className='flex  text-red-600 items-center gap-1'>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStarHalf/>
          </div>
          <div className='flex items-center gap-2 text-2xl lg:text-3xl my-2 '>
            <p className='text-red-600'>{DisplayInrCurrency(data?.sellingPrice)}</p>
            <p className='line-through text-slate-400 '>{DisplayInrCurrency(data?.price)}</p>
          </div>

              <div className='flex items-center gap-3 my-2'>
                <button className=' border-2  border-red-600 text-red-600 font-medium  hover:bg-red-600 hover:text-white duration-200 rounded px-3 py-1 min-w-[120px] '>Buy</button>
                <button className=' border-2  border-red-600 text-white   font-medium  bg-red-600         hover:text-red  hover:bg-white hover:text-red-600 duration-200 rounded px-3 py-1 min-w-[120px] '>Add to Cart</button>
              
              </div>

              <div>
                <p className=' text-slate-600 font-medium my-1'>Description</p>
                <p>{data?.description}</p>
              </div>

        </div>
      </div>



    </div>
  )
}

export default ProductDetails