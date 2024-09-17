import { useState } from 'react'
import { IoMdSend } from "react-icons/io";
const SendMessage = () => {
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
        <div className='flex w-full gap-2 justify-between p-2'>
          <input value={message} onChange={(e)=>setMessage(e.target.value)} className='p-2 rounded-md w-[90%] bg-transparent border-2' type="text" placeholder='Message' />
          <button disabled={message === ''} type='submit' className={`text-4xl hover:text-orange-500`}>
            {message !== '' ? <IoMdSend /> : ''}
          </button>
        </div>
      </form>
  )
}

export default SendMessage