import { useEffect } from "react";
import { getOtherUsers } from "../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createConversation } from "../Redux/Actions/converAction";

const OtherUser = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((v) => v.users);
  const { user } = useSelector((v) => v.auth);
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
      <ToastContainer></ToastContainer>
      {users && users.length > 0 ? (
        users.map((v, i) => (
          <div key={i} className="flex backdrop-blur-3xl bg-opacity-100 mb-1 hover:bg-gray-400">
            <div className="flex flex-[20%] items-center h-20 w-20 border-b-1 mt-1">
              <img
                className="h-16 p-1 m-2 ml-6 w-16 rounded-full"
                src={v.avatar?.url}
                alt="User avatar"
              />
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

export default OtherUser