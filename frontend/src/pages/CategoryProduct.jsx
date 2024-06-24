import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCategory from '../helpers/ProductCategory';
import axios from 'axios';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {

  const params = useParams();

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectedCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([])


  const fetchdata = async () => {

    const response = await axios.post(SummaryApi.filter_product.url, { category: filterCategoryList },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    console.log(response)
    setData(response?.data?.data || [])

  }
  // {params?.categotyName}
  // console.log(params)

  const handleselectcategory = (e) => {
    const { name, value, checked } = e.target;

    console.log(name, value, checked)
    setSelectedCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      }

    })

  }

  console.log("setSelectedCategory", selectCategory);
  useEffect(() => {
    fetchdata();
  }, [filterCategoryList])


  useEffect(() => {

    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }

      return null
    }).filter(el => el)
    setFilterCategoryList(arrayOfCategory);


    console.log("selectCategory", arrayOfCategory)

  }, [selectCategory])

  return (
    <div className='container mx-auto p-4'>

      {/* Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>

        {/* left side */}
        <div className=' bg-white p-2 min-h-[calc(100vh-155px)] overflow-y-scroll'>
          {/*Sory By  */}
          <div className=''>
            <h3 className='text-lg uppercase  font-medium text-slate-500 border-b pb-2  border-slate-300'>Sort By</h3>

            <form className='text-sm  flex flex-col gap-2 py-2'>

              <div className='flex items-center gap-3'>
                <input type="radio" name="sort" id='sort1' />
                <label htmlFor="sort1 ">Price -  Low to High</label>
              </div>
              <div className='flex items-center gap-3 '>
                <input type="radio" name="sort" id='sort' />
                <label htmlFor="sort">Price -   High to Low</label>
              </div>

            </form>

          </div>


          {/*filter By  */}
          <div className=''>
            <h3 className='text-lg uppercase  font-medium text-slate-500 border-b pb-2  border-slate-300'>Sort By</h3>

            <form className='text-sm  flex flex-col gap-2 py-2'>

              {
                ProductCategory.map((catergories, index) => {
                  return (
                    <div className='flex  items-center  gap-2'>
                      <input type="checkbox" name="category" id={catergories?.value} checked={selectCategory[catergories?.value]} value={catergories?.value} onChange={handleselectcategory} />
                      <label htmlFor={catergories?.value}>{catergories?.label}</label>
                    </div>
                  )
                })
              }


            </form>

          </div>
        </div>

        {/* right side */}
        <div>
          {
            data?.length !== 0 && !loading &&
            (
              <VerticalCard loading={loading} data={data} />
            )
          }
        </div>

      </div>

    </div>
  )
}

export default CategoryProduct