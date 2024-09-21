import { useSelector } from 'react-redux';
import image1 from '../../assets/image.png';
import { IoArrowBack } from "react-icons/io5";
import { MdKey } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdEmojiEmotions } from "react-icons/md";
import { FaHandHoldingHeart, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'
const Profile = () => {
  const { user } = useSelector((v) => v.auth);
  return (
    <div className='bg-blue-900 w-[420px] sm:w-[600px] h-[1000px]  sm:h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
      <div className="flex ml-5 gap-5 text-3xl text-black font-bold p-2">
        <span onClick={() => window.history.back()} className='pt-1 hover:text-white'>
          <IoArrowBack />
        </span>
        <h1>
          Setting
        </h1>
      </div>
      <hr />
      <Link to={'/profile/me'}><div className='flex w-full sm:w-[600px] mt-4 p-2'>
        <span className='flex-[20%]'>
          <img className='cursor-auto hover:scale-105 duration-100 transition-all w-16 h-16 object-fill rounded-full' src={user?.avatar?.url || image1} alt="Image is missing" />
        </span>
        <span className='flex-[75%] pt-1 overflow-hidden p-2'>
          <h1 className='cursor-pointer text-2xl font-bold'>{user?.name}</h1>
          <p className='overflow-hidden w-full text-ellipsis text-nowrap'>{user?.about}</p>
        </span>
      </div></Link>
      <hr />
      <div>
        <div className='flex text-2xl gap-8 p-4'>
          <span className='pt-3 text-3xl'>
            <MdKey />
          </span>
          <span>
            <h1 className='font-bold'>Acount</h1>
            <p className='text-lg'>Security Notification, Change number</p>
          </span>
        </div>
        <div className='flex text-2xl gap-8 p-4'>
          <span className='pt-3 text-3xl'>
            <MdOutlinePrivacyTip />
          </span>
          <span>
            <h1 className='font-bold'>Privacy</h1>
            <p className='text-lg'>Block contacts, disappearing message</p>
          </span>
        </div>
        <div className='flex text-2xl gap-8 p-4'>
          <span className='pt-3 text-3xl'>
            <MdEmojiEmotions />
          </span>
          <span>
            <h1 className='font-bold'>Avatar</h1>
            <p className='text-lg'>Create, edit, profile photo</p>
          </span>
        </div>
        <div className='flex text-2xl gap-8 p-4'>
          <span className='pt-3 text-3xl'>
            <FaHeart />
          </span>
          <span>
            <h1 className='font-bold'>Favourite</h1>
            <p className='text-lg'>Add, reorder, remove</p>
          </span>
        </div>
        <div className='flex text-2xl gap-8 p-4'>
          <span className='text-3xl'>
            <FaHandHoldingHeart />
          </span>
          <span>
            <h1 className='font-bold'>Invite Friend</h1>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Profile