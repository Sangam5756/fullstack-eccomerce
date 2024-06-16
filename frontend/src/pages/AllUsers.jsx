import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
const AllUsers = () => {
  const [alluser, setAlluser] = useState([]);
  const [openUpdatedUser, setOpenUpdatedUser] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  });

  const fetchUser = async () => {
    const userResponse = await axios.get(SummaryApi.all_Users.url, {
      withCredentials: "include",
    });

    if (userResponse.data.success) {
      setAlluser(userResponse.data.data);
    }
    if (userResponse.data.error) {
      toast.error(userResponse.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full pb-4 bg-white">
      <table className="w-full border userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="pb-4 bg-white">
          {alluser.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("ll")}</td>
                <td>
                  <button
                    className="bg-green-200 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdatedUserDetails(el);

                      setOpenUpdatedUser(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdatedUser && (
        <ChangeUserRole
          onClose={() => setOpenUpdatedUser(false)}
          name={updatedUserDetails.name}
          email={updatedUserDetails.email}
          role={updatedUserDetails.role}
          userId={updatedUserDetails._id}
          callFunc={fetchUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
