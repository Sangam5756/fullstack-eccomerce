import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
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
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoom, setZoom] = useState(false)


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


  useEffect(() => {

    fetchDetails();
  }, [])

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl)


  }
  const handleZoomImage = useCallback((e) => {
    setZoom(true)
    const { left, top, width, height } = e.target.getBoundingClientRect();
    console.log("coordinate", left, top, width, height);

    const x = (e.clientX - left) / width
    const y = (e.clientX - top) / height
    setZoomImageCoordinate({
      x, y
    })
    
  }, [zoomImageCoordinate])

  const handleZoomOutImage = () =>{
    setZoom(false)
  }

  return (
    <div className='container  mx-auto p-4'>

      {/* Product Image */}
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4 '>


        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          {
            loading ? (<div className='lg:h-96 lg:w-96 h-[300px] w-[300px] animate-pulse bg-slate-200'>
            </div>) :

              (<div className='lg:h-96 lg:w-96 h-[300px] w-[300px]  bg-slate-200 ml-5 relative'>
                <img src={activeImage} alt="" className='h-full w-full object-scale-down  mix-blend-multiply 'onMouseLeave={handleZoomOutImage} onMouseMove={handleZoomImage} />

               {
                zoom && (
                  <div className=' absolute bg-slate-200 min-w-[500px] min-h-[400px]  p-2 -right-[510px] overflow-hidden hidden lg:block top-0'>
                  <div className='h-full min-w-[500px] min-h-[400px] w-full  mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                    }}>

                  </div>

                </div>

                )
               }
              </div>)
          }

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
        {
          loading ? (


            <div className='flex flex-col w-full gap-5'>
              <p className=' bg-slate-200  px-7  rounded-full inline-block w-fit p-5  animate-pulse'> </p>
              <h2 className='text-2xl lg:text-4xl font-medium p-5 rounded w-21 bg-slate-200'></h2>
              <p className='capitalize text-slate-400  bg-slate-200 p-5'></p>
              <div className='flex  text-slate-200 animate-pulse items-center gap-1 bg-slate-200 p-5'>

              </div>
              <div className='flex items-center gap-3 text-2xl lg:text-3xl my-2 w-full '>
                <p className='text-red-600  bg-slate-200 p-3 w-full'></p>
                <p className='line-through  bg-slate-200 p-3 text-slate-400 w-full'></p>
              </div>

              <div className='flex  justify-between   gap-6 my-2'>
                <button className=' border-2  bg-slate-200 p-2 rounded px-3   animate-pulse py-4 min-w-[400px] '></button>
                <button className=' border-2  rounded px-3 py-4 bg-slate-200  animate-pulse  min-w-[400px] '></button>

              </div>

              <div>
                <p className=' text-slate-600 font-medium my-1 bg-slate-200 animate-pulse p-2'></p>
                <p className=' w-fit mt-1'></p>
              </div>

            </div>



          ) : (
            <div className='flex flex-col gap-1'>
              <p className=' bg-red-200  text-red-600 px-2  rounded-full inline-block w-fit'> {data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
              <div className='flex  text-red-600 items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
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
          )
        }
      </div>



    </div>
  )
}

export default ProductDetails