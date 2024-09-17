import { useEffect, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendMessage } from '../../Redux/Actions/converAction';
const SendMessage = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const { converId } = useSelector((v) => v.conversations);
  console.log(converId);
  const { error, success } = useSelector((v) => v.message);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success("Message Sent SuccessFully");
      setMsg("");
    }
  }, [error, success]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      message : msg
    }
    if (converId) {
      dispatch(sendMessage(converId, formData));
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