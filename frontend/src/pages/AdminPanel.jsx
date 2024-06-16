import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { Link, Outlet } from 'react-router-dom';


const AdminPanel = () => {

  const user = useSelector((state) => state?.user?.user); // Ensure correct path

  return (

    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='w-full min-h-full bg-white max-w-60 customShadow'>
        <div className=' h-32 flex justify-center items-center flex-col '> 
        <div className="text-4xl  cursor-pointer relative flex justify-center ">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full text-sm"
                  alt={user?.name}
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p>{user?.role}</p>
        </div>
        {/* NAVIGATION */}
        <div>
          <nav className='grid p-4'>

                <Link to={"all-users"} className='px-4 py-1 hover:bg-slate-100'>All Users</Link>
                <Link to={"all-products"} className='px-4 py-1 hover:bg-slate-100'>All  Product</Link>

          </nav>
        </div>

      </aside>
      <main>
        <Outlet/>
        
      </main>
      
    </div>
  )
}

export default AdminPanel