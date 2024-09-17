import { useDispatch, useSelector } from 'react-redux'
import Chat from './Chat'
import SendMessage from './SendMessage'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { getOtherUsers } from '../../Redux/Actions/userAction'

const Conversation = () => {
  const { users, loading } = useSelector((v) => v.users);
  const { id } = useParams();
  const chatUser = users.find((user) => user._id === id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getOtherUsers());
    }
  }, [dispatch, users]);
  if (loading) {
    return <div>Please wait</div>;
  }
  return (
    <div className='sm:w-[600px] w-full h-full bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100'>
      <div className='p-2 flex gap-4 h-[10vh] sm:h-[14vh]'>
        <img className='h-16 w-16 p-1 object-fill rounded-full' src={chatUser?.avatar?.url} alt="No image found" />
        <div className='p-2'>
          <h1 className='text-2xl font-bold'>{chatUser?.name}</h1>
          <p>{chatUser?.isOnline ? "Online" : "Last Seen today at 12:14 PM"}</p>
        </div>
      </div>
      <hr />
      <div className='h-[85vh] sm:h-[75vh] overflow-auto'>
        <Chat />
      </div>
      <div className='h-[8vh] sm:h-[11vh]'>
        <SendMessage />
      </div>
    </div>
  )
}

export default Conversation