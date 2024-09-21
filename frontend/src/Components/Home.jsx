import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearErrors, logoutUserNow, setOnlineUserNow } from "../Redux/Actions/userAction";
import OtherUser from "./OtherUser";
// import MyConversation from "./Conversation/MyConversation";
import { io } from "socket.io-client";
const Home = () => {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, message, error, loading } = useSelector((v) => v.auth);
  const { user } = useSelector((state) => state.auth);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    if (user) {
      const socket = io('http://localhost:4000', {
        query: { userId: user._id },
      });
      socket.on('userOnline', (userId) => {
        setOnlineUsers((prev) => [...prev, userId]); // Add user to online list
        dispatch(setOnlineUserNow(userId))
      });
      socket.on('userOffline', (userId) => {
        setOnlineUsers((prev) => prev.filter((id) => id !== userId)); 
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [user, dispatch]);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search)
  }
  useEffect(() => {
    if (message) {
      toast.info(message);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (!isAuth) {
      navigate('/login')
    }
  }, [message, error, dispatch, isAuth, navigate])
  const handleLogout = () => {
    dispatch(logoutUserNow());
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="w-[100%] sm:w-[600px] sm:mt-8 h-full bg-blue-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 ">
        <div className="flex justify-between sm:h-12">
          <div className="text-white font-bold text-2xl p-2">LetsChaT</div>
          <div className="flex font-bold text-2xl p-2 gap-4">
            <span className="text-white hover:text-orange-600">
              <FaCamera />
            </span>
            <span className="text-white hover:text-orange-600">
              <SlOptionsVertical />
            </span>
          </div>
        </div>
        <form onSubmit={handleSearch} className="w-full flex items-center justify-center">
          <input onChange={(e) => setSearch(e.target.value)} className="w-[90%] placeholder-white m-2 focus:placeholder-blue-900 rounded-lg h-8 bg-transparent text-white border-[1px] px-4 py-3 backdrop-blur-3xl bg-opacity-100" type="text" placeholder="Search here" />
        </form>
        <div className="flex gap-5 p-2">
          <span onClick={() => setActive(false)} className={`rounded-md cursor-pointer  font-bold p-1 ${active === false ? "bg-gray-200 text-black" : ""}`}>
            All Users
          </span>
          <span onClick={() => setActive(true)} className={`rounded-md cursor-pointer font-bold p-1  ${active ? "bg-gray-200 text-black" : ""}`}>
            My Conversations
          </span>
        </div>
        <div className="sm:h-[400px] h-[750px] overflow-auto">
          {/* {active ? <MyConversation/> : <OtherUser />} */}
          <OtherUser onlineUser={onlineUsers} />
        </div>
      </div>
      <div className="w-full sm:ml-10">
        <div className="flex text-4xl gap-6 mt-3 px-2 py-3 sm:-mt-10 sm:py-0">
          <Link to={'/profile'}><span className="hover:text-orange-600 hover:text-5xl transition-all duration-300">
            <CgProfile title="Profile" />
          </span></Link>
          <span disabled={loading} onClick={handleLogout} className="hover:text-orange-600 hover:text-5xl transition-all duration-300">
            <GrLogout title="Logout" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home