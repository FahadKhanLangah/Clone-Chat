import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../Redux/Actions/converAction";
import { toast, ToastContainer } from 'react-toastify'

const Chat = () => {
  const { converId } = useSelector((v) => v.conversations);
  const { loading, messages, error } = useSelector((v) => v.message);
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (converId) {
      dispatch(getMessage(converId))
    }
  }, [dispatch, converId]);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  if (loading) {
    return <>
      loading.....
    </>
  }
  return (
    <div className='p-4 flex flex-col space-y-4'>
      <ToastContainer />
      {
        messages.map((v, i) =>
          <div key={i} className={`flex ${user._id !== v.sender ? "justify-start" : "justify-end"}`}>
            <div className={` p-3 rounded-lg max-w-md ${user._id === v.sender ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}>
              {v.message}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Chat