import { IoArrowBack } from 'react-icons/io5'
import { CiCamera } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
const ProfileDetail = () => {
  const { user } = useSelector((v) => v.auth);
  return (
    <div className='bg-blue-900 w-[420px] sm:w-[600px] h-[1000px]  sm:h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
      <div className="flex ml-5 my-4 gap-5 text-3xl text-black font-bold p-2">
        <span onClick={() => window.history.back()} className='pt-1 hover:text-white'>
          <IoArrowBack />
        </span>
        <h1>
          Profile
        </h1>
      </div>
      <div className='flex justify-center items-center relative'>
        <img className='w-48 h-48 rounded-full' src={user.avatar?.url} alt="" />
        <span className=' w-16 h-16 rounded-full font-bold bg-green-700 absolute bottom-0 left-[55%] flex justify-center items-center'>
          <CiCamera className=' text-4xl' />
        </span>
      </div>
      <hr className='m-8' />
      <div className='flex m-2 p-4 gap-6'>
        <span className='text-4xl pt-6'>
          <CgProfile />
        </span>
        <span className='w-full'>
          <h1 className='text-gray-200 font-bold'>Name</h1>
          <span className='flex justify-between text-xl w-full'>
            <h2 className='text-2xl font-bold'>Fahad Khan</h2>
            <span className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit/>
            </span>
          </span>
          <p className='text-gray-300'>This name will be visible to your chat friends</p>
        </span>
      </div>
      <hr />
      <div className='flex m-2 p-4 gap-6'>
        <span className='text-4xl pt-4'>
          <IoIosInformationCircleOutline />
        </span>
        <span className='w-full'>
          <h1 className='text-gray-200 font-bold'>About</h1>
          <span className='flex justify-between text-xl w-full'>
            <h2 className='text-xl'>{user.about}</h2>
            <span className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit/>
            </span>
          </span>
        </span>
      </div>
      <hr />
      <div className='flex m-2 p-4 gap-6'>
        <span className='text-4xl pt-4'>
          <FaPhoneAlt />
        </span>
        <span className='w-full'>
          <h1 className='text-gray-200 font-bold'>Phone</h1>
          <span className='flex justify-between text-xl w-full'>
            <h2 className='text-2xl'>+92{user.phone}</h2>
            <span className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit/>
            </span>
          </span>
        </span>
      </div>
    </div>
  )
}

export default ProfileDetail