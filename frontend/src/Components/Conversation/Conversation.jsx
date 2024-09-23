import { useDispatch, useSelector } from 'react-redux'
import Chat from './Chat'
import SendMessage from './SendMessage'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getOtherUsers } from '../../Redux/Actions/userAction'
import { IoArrowBack } from 'react-icons/io5'

const Conversation = () => {
  const { users, loading, } = useSelector((v) => v.users);
  const { onlineUsers } = useSelector((v) => v.auth);
  const { id } = useParams();
  const chatUser = users.find((user) => user._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  return (
    <div className='sm:mt-2 sm:mb-2 sm:w-[600px] w-full h-full bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100'>
      <div className='p-2 flex gap-4 h-[10vh] sm:h-[14vh]'>
        <span onClick={() => window.history.back()} className='pt-5 hover:text-orange-400 text-3xl'>
          <IoArrowBack />
        </span>
        <img className='h-16 w-16 p-1 object-fill rounded-full' src={chatUser?.avatar?.url} alt="No image found" />
        <div onClick={handleNavigate} className='p-2 cursor-pointer'>
          <h1 className='text-2xl font-bold'>{chatUser?.name}</h1>
          <p>{onlineUsers?.includes(chatUser?._id) ? "Online" : "Last Seen today at 12:14 PM"}</p>
        </div>
      </div>
      <hr />
      <div className='h-[82vh] sm:h-[75vh] overflow-auto'>
        <Chat />
      </div>
      <div className='h-[8vh] sm:h-[11vh]'>
        <SendMessage />
      </div>
    </div>
  )
}

export default Conversation