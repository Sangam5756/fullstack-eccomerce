import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {

  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);




  const fetchProduct = async () => {
    setLoading(true)
    const response = await axios.get(SummaryApi.search_product.url + query.search)
    setData(response?.data?.data);
    setLoading(false);
    console.log(response)

  }

  useEffect(() => {

    fetchProduct();

  }, [query])


  return (
    <div className='container mx-auto p-4'>
      {
        loading && (<p className='text-lg text-center'>Loading....</p>)

      }
      
      <p className='text-lg font-bold py-3'>Search Results : {data.length}</p>


      {
        data.length == 0 && !loading && (
            <p className='bg-white  text-lg text-center p-4'>No Data Found....</p>
        )
      }

{
        data.length !== 0 && !loading && (
            
            
                <VerticalCard loading={loading} data={data}/>
              
            
        )
      }

    </div>
  )
}

export default SearchProduct