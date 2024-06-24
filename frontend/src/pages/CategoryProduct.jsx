import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {

  const params = useParams();


  return (
    <div className='container mx-auto p-4'>

      {/* Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>

        {/* left side */}
        <div className=' bg-white p-2 min-h-[calc(100vh-155px)]'>

          <div className=''>
            <h3 className='text-lg uppercase  font-medium text-slate-500 border-b pb-2  border-slate-300'>Sort By</h3>

          </div>
              {/* 15:57/ */}
        </div>

        {/* right side */}
        <div>
          display Product
        </div>

      </div>

    </div>
  )
}

export default CategoryProduct