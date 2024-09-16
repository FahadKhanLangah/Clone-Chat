import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import Conversation from "./Conversation";
import { GrLogout } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search)
  }
  const handleLogout = ()=>{
    navigate('/login')
    console.log("Hello")
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
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
        <div className="sm:h-[400px] h-[750px] overflow-auto">
          <Conversation />
        </div>
      </div>
      <div className="w-full sm:ml-10">
        <div className="flex text-4xl gap-6 mt-3 px-2 py-3 sm:-mt-10 sm:py-0">
          <span className="hover:text-orange-600 hover:text-5xl transition-all duration-300">
            <CgProfile title="Profile" />
          </span>
          <span onClick={handleLogout} className="hover:text-orange-600 hover:text-5xl transition-all duration-300">
            <GrLogout title="Logout"  />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home