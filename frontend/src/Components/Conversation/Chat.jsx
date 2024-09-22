import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../Redux/Actions/converAction";
import { toast, ToastContainer } from 'react-toastify'
import socket from "../../socket";
import { useParams } from "react-router-dom";
import { setLastMsg } from "../../Redux/Actions/messageAction";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const { messages, error } = useSelector((v) => v.message);
  const { user } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  const { converId } = useSelector((v) => v.conversations);
  const { cid } = useParams();
  const conId = cid || converId;
  useEffect(() => {
    if (conId) {
      setChat([]);
      setLastMessage(null);
      dispatch(getMessage(conId));
      socket.emit('joinConversation', conId);
    }
  }, [dispatch, conId]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chat]);
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
  const allMessages = useMemo(() => [...messages, ...chat], [messages, chat]);
  const [lastMessage, setLastMessage] = useState(null);
  useEffect(() => {
    if (conId && allMessages.length > 0) {
      setLastMessage(allMessages[allMessages.length - 1]);
    }else {
      setLastMessage(null);
    }
  }, [allMessages,conId]);

  useEffect(() => {
    if (conId && lastMessage) {
      const id = lastMessage._id;
      dispatch(setLastMsg(id, conId));
    }
  }, [dispatch, conId, lastMessage]);

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