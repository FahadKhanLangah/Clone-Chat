import { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendMessage } from '../../Redux/Actions/converAction';
import socket from '../../socket';
import { IoGameController } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

const SendMessage = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { converId } = useSelector((v) => v.conversations);
  const { user } = useSelector((v) => v.auth)
  const { cid } = useParams();
  const [conId, setConId] = useState("")
  useEffect(() => {
    if (cid) {
      setConId(cid);
    } else {
      setConId(converId);
    }
  }, [cid, converId]);
  useEffect(() => {
    if (conId) {
      socket.emit('joinConversation', conId);
      socket.connect();
    }
  }, [conId]);
  const { error } = useSelector((v) => v.message);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg && conId) {
      const messageData = {
        conversationId: conId,
        sender: user._id,
        message: msg,
      };
      socket.emit('sendMessage', messageData);
      dispatch(sendMessage(conId, { message: msg }));
      setMsg("");
    }
  }
  const navigate = useNavigate();
  const handleGameReq = () => {
    navigate(`/game/${conId}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full gap-2 justify-between p-2'>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} className='p-2 rounded-md w-[90%] bg-transparent border-2' type="text" placeholder='Message' />
        {msg !== '' ?
          <button disabled={msg === ''} type='submit' className={`text-4xl hover:text-orange-500`}>
            <IoMdSend />
          </button>
          :
          <button onClick={handleGameReq} className={`text-4xl hover:text-orange-500`}>
            <IoGameController />
          </button>
        }
      </div>
    </form>
  )
}
export default SendMessage