import { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendMessage } from '../../Redux/Actions/converAction';
import socket from '../../socket';

const SendMessage = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { converId } = useSelector((v) => v.conversations);
  const { user } = useSelector((v) => v.auth)
  useEffect(() => {
    if (converId) {
      socket.emit('joinConversation', converId);
      socket.connect();
    }
  }, [converId]);
  const { error } = useSelector((v) => v.message);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg && converId) {
      const messageData = {
        conversationId: converId,
        sender: user._id,
        message: msg,
      };
      socket.emit('sendMessage', messageData);
      dispatch(sendMessage(converId, { message: msg }));
      setMsg("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full gap-2 justify-between p-2'>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} className='p-2 rounded-md w-[90%] bg-transparent border-2' type="text" placeholder='Message' />
        <button disabled={msg === ''} type='submit' className={`text-4xl hover:text-orange-500`}>
          {msg !== '' ? <IoMdSend /> : ''}
        </button>
      </div>
    </form>
  )
}
export default SendMessage