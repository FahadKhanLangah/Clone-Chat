import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdPermMedia } from "react-icons/md";
const ChatUser = () => {
  const { users } = useSelector((v) => v.users);
  const { id } = useParams();
  const chatUser = users.find((user) => user._id === id);
  return (
    <div className='sm:mt-2 sm:mb-2 sm:w-[600px] w-full sm:h-full h-[100vh] bg-purple-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 '>
      <div className="flex ml-5 my-0 text-3xl text-black font-bold pt-2 pl-2">
        <span onClick={() => window.history.back()} className='pt-1 hover:text-white'>
          <IoArrowBack />
        </span>
      </div>
      <div className='flex flex-col justify-center items-center relative duration-700'>
        <img className='w-48 h-48 rounded-full' src={chatUser.avatar?.url} alt="" />
        <h1 className="text-3xl font-semibold py-3">{chatUser.name}</h1>
        <h1 className="text-2xl pb-2">+92 - {chatUser.phone}</h1>
      </div>
      <div className="flex py-4 gap-4 justify-center">
        <div className="border-2 h-20 w-28 flex flex-col rounded-xl justify-center items-center text-3xl">
          <h1 className="text-2xl text-green-600 font-bold">Audio</h1>
          <span className="hover:text-orange-500  cursor-pointer">
            <IoMdCall />
          </span>
        </div>
        <div className="border-2 h-20 w-28 flex flex-col rounded-xl justify-center items-center text-3xl">
          <h1 className="text-2xl text-green-600 font-bold">Video</h1>
          <span className="hover:text-orange-500  cursor-pointer">
            <FaVideo />
          </span>
        </div>
        <div className="border-2 h-20 w-28 flex flex-col rounded-xl justify-center items-center text-3xl">
          <h1 className="text-2xl text-green-600 font-bold">Search</h1>
          <span className="hover:text-orange-500  cursor-pointer">
            <FaSearch />
          </span>
        </div>
      </div>
      <hr className="border-8 border-purple-900 my-4" />
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-green-600">About</h1>
        <p>{chatUser.about}</p>
      </div>
      <hr className="border-8 border-purple-900 my-4" />
      <div className="flex text-3xl p-2 cursor-pointer">
        <span className="flex-[20%] hover:text-orange-500 pl-6 pt-1">
          <IoMdNotifications />
        </span>
        <span className="flex-[80%] text-green-600">
          Notifications
        </span>
      </div>
      <div className="flex text-3xl p-2 cursor-pointer">
        <span className="flex-[20%] hover:text-orange-500 pl-6 pt-1">
          <MdPermMedia />
        </span>
        <span className="flex-[80%] text-green-600">
          Media
        </span>
      </div>
      <hr className="border-8 border-purple-900 my-4" />
    </div>
  )
}

export default ChatUser