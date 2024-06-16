import React, { useState } from 'react'
import ROLE from '../common/ROLE'
import { IoMdClose } from "react-icons/io"
import axios from "axios"
import SummaryApi from "../common";

const ChangeUserRole = ({ name, email, role, onClose }) => {

  const [userRole, setUserRole] = useState(role)

  const handleOnchangeSelect = (e) => {
    setUserRole(e.target.value)

  }

  const updateUserRole = async () => {

    const updatedResponse = await axios.post(SummaryApi.update_Users.url,userRole, {
      withCredentials: "include",
      headers:{
        "content-type" :"application/json"
      }
    })

    console.log(updatedResponse)

  }



  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center '>

      <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto' onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

        <p>Name  : {name}</p>
        <p>Email : {email}</p>
        <div className='flex items-center justify-between my-4'>
          <p>Role :</p>
          <select className=' border px-4 py-1' value={userRole} onChange={handleOnchangeSelect}>
            {
              Object.values(ROLE).map(el => {
                return (
                  <option value={el} key={el} >{el}</option>
                )
              })
            }
          </select>
        </div>
        <button onClick={updateUserRole} className='w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white'>Change Role</button>

      </div>

    </div>
  )
}

export default ChangeUserRole