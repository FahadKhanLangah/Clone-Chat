import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../Redux/Actions/converAction";
import { toast, ToastContainer } from 'react-toastify'
import socket from "../../socket";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const { converId } = useSelector((v) => v.conversations);
  const { messages, error } = useSelector((v) => v.message);
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chat]);
  useEffect(() => {
    if (converId) {
      dispatch(getMessage(converId));
      socket.emit('joinConversation', converId);
    }
  }, [dispatch, converId]);
  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setChat((prevChat) => [...prevChat, newMessage]);
    });
    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  const allMessages = [...messages, ...chat];
  return (
    <div className='p-4 flex flex-col space-y-4'>
      <ToastContainer />
      {
        allMessages.map((v, i) =>
          <div key={i} className={`flex ${user._id !== v.sender ? "justify-start" : "justify-end"}`}>
            <div className={` p-3 rounded-lg max-w-md ${user._id === v.sender ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}>
              {v.message}
            </div>
          </div>
        )
      }
      <div ref={chatEndRef} />
    </div>
  )
}
export default Chat