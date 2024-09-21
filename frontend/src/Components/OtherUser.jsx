import { useEffect } from "react";
import { getOtherUsers } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../Redux/Actions/converAction";
import PropTypes from 'prop-types'; 
const OtherUser = ({onlineUser}) => {
  const dispatch = useDispatch();
  const { users, error, loading,onlineUsers } = useSelector((v) => v.users);
  const { user } = useSelector((v) => v.auth);
  console.log("From State",onlineUsers)
  useEffect(() => {
    dispatch(getOtherUsers())
  }, [dispatch])
  useEffect(() => {
    if (error) {
      toast(error)
    }
  }, [error]);
  const navigate = useNavigate();
  const handleNavigate = (otherId) => {
    const formdata = {
      participants: [
        otherId, user._id
      ]
    }
    dispatch(createConversation(formdata))
    navigate(`/conversation/${otherId}`)
  }
  if (loading) {
    return <>
      <p className="text-center text-lg">Loading users, please wait...</p>;
    </>
  }
  return (
    <>
      <ToastContainer/>
      {users && users.length > 0 ? (
        users.map((v, i) => (
          <div key={i} className="flex backdrop-blur-3xl bg-opacity-100 mb-1 hover:bg-gray-400">
            <div className="flex flex-[20%] items-center online h-20 w-20 border-b-1 mt-1 relative">
              <img
                className="online h-16 p-1 m-2 ml-6 w-16 rounded-full"
                src={v.avatar?.url}
                alt="User avatar"
              />
              {onlineUser && onlineUser.includes(v._id)? <div className="absolute  right-0 sm:right-10 top-4 h-3 w-3 border-2 border-white bg-green-500 rounded-full" /> : null}
            </div>
            <div onClick={() => handleNavigate(v._id)} className="pt-4 flex-[80%] pl-6 overflow-hidden h-20">
              <h1 className="text-2xl font-bold">{v.name}</h1>
              <p className="overflow-hidden">{v.about}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg">No users found.</p>
      )}
    </>
  )
}
OtherUser.propTypes = {
  onlineUser: PropTypes.arrayOf(PropTypes.string).isRequired, 
};

export default OtherUser