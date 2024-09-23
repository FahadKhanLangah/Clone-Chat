import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../Redux/Actions/converAction";
import { toast, ToastContainer } from 'react-toastify'
import socket from "../../socket";
import { useParams } from "react-router-dom";
import { setLastMsg, updateReadStatus } from "../../Redux/Actions/messageAction";
import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import { clearErrors } from "../../Redux/Actions/userAction";

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
      dispatch(updateReadStatus(conId));
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
      dispatch(clearErrors())
    }
  }, [error,dispatch])
  const allMessages = useMemo(() => [...messages, ...chat], [messages, chat]);
  const [lastMessage, setLastMessage] = useState(null);
  useEffect(() => {
    if (conId && allMessages.length > 0) {
      setLastMessage(allMessages[allMessages.length - 1]);
    } else {
      setLastMessage(null);
    }
  }, [allMessages, conId]);

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
            <div className={` p-2 pl-3 pb-4 flex min-w-28 flex-col relative rounded-lg max-w-md ${user._id === v.sender ? "bg-gray-300 text-black" : "bg-green-400 text-black"}`}>
              <div className="pr-5">{v.message}</div>
              <p className="text-[10px] bottom-0 absolute flex gap-2 right-2">
                <div>{new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className="text-[14px]">{v.isRead ? <FaCheckDouble className="text-blue-500" /> : <FaCheck className="text-gray-500" />}</div>
              </p>
            </div>
          </div>
        )
      }
      <div ref={chatEndRef} />
    </div>
  )
}
export default Chat