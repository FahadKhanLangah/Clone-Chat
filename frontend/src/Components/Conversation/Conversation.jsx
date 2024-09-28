import { useDispatch, useSelector } from 'react-redux'
import Chat from './Chat'
import SendMessage from './SendMessage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { clearErrors, getOtherUsers } from '../../Redux/Actions/userAction'
import { IoArrowBack } from 'react-icons/io5'
import { MdDelete } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import { deleteMessageNow } from '../../Redux/Actions/messageAction'
import { toast } from 'react-toastify'

const Conversation = () => {
  const { users, loading, } = useSelector((v) => v.users);
  const { onlineUsers } = useSelector((v) => v.auth);
  const { id } = useParams();
  const {message ,error} = useSelector((v)=>v.msg);
  const chatUser = users.find((user) => user._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMessages, setSelectedMessages] = useState([]);
  useEffect(()=>{
    if (message) {
      toast(message)
    }
    if (error) {
      toast(error)
      dispatch(clearErrors());
    }
  },[error,message,dispatch])
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getOtherUsers());
    }
  }, [dispatch, users]);
  if (loading) {
    return <div>Please wait</div>;
  }
  const handleNavigate = () => {
    navigate(`/chatuser/${id}`)
  }
  const handleDeleteSelectedMessages = () => {
    if (selectedMessages.length > 0) {
      dispatch(deleteMessageNow(selectedMessages));
      setSelectedMessages([]);
    }
  };
  return (
    <div className='sm:mt-2 sm:mb-2 sm:w-[600px] w-full h-full bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100'>
      <div className='p-2 flex gap-4 h-[10vh] sm:h-[14vh]'>
        <span onClick={() => window.history.back()} className='pt-5 hover:text-orange-400 text-3xl'>
          <IoArrowBack />
        </span>
        <img className='h-16 w-16 p-1 object-fill rounded-full' src={chatUser?.avatar?.url} alt="No image found" />
        <div onClick={handleNavigate} className='p-2 w-[50vh] cursor-pointer'>
          <h1 className='text-2xl font-bold'>{chatUser?.name}</h1>
          <p>{onlineUsers?.includes(chatUser?._id) ? "Online" : "Last Seen today at 12:14 PM"}</p>
        </div>
        {selectedMessages.length > 0 && (
          <div className="flex gap-6 pt-4">
            <button onClick={handleDeleteSelectedMessages} className="text-3xl hover:text-orange-600 rounded">
              <MdDelete />
            </button>
            <button className='text-3xl hover:text-orange-600 '>
              <MdInfoOutline />
            </button>
          </div>
        )}
      </div>
      <hr />
      <div className='h-[82vh] sm:h-[75vh] overflow-auto'>
        <Chat setSelectedMessages={setSelectedMessages} selectedMessages={selectedMessages} />
      </div>
      <div className='h-[8vh] sm:h-[11vh]'>
        <SendMessage />
      </div>
    </div>
  )
}

export default Conversation