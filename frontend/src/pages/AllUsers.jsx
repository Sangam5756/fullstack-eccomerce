import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';

const AllUsers = () => {

  const [alluser, setAlluser] = useState([]);

  const fetchUser = async () => {

    const userResponse = await axios.get(SummaryApi.all_Users.url, {
      withCredentials: 'include'
    })
    // console.log(userResponse.data.data)
    setAlluser(userResponse.data.data.data);
    console.log(alluser)
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div className='w-full'>
        <table className='w-full border'>
          <thead>
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
          </thead>
        </table>

    </div>
  )
}

export default AllUsers