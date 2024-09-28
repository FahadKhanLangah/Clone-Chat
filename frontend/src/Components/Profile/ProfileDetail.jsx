import { IoArrowBack } from 'react-icons/io5'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserNow } from '../../Redux/Actions/userAction';
const ProfileDetail = () => {
  const { user, message } = useSelector((v) => v.auth);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(true);
  const [about, setAbout] = useState("");
  const [editabout, setEditAbout] = useState(true);
  const [phone, setPhone] = useState("");
  const [editPhone, setEditphone] = useState(true);
  const dispatch = useDispatch();
  const [editAvatar, setEditAvatar] = useState(true);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  }
  useEffect(() => {
    toast.info(message)
  }, [message])
  const handleUpdate = () => {
    const formData = new FormData();
    if (name) { formData.append("name", name) };
    if (phone) { formData.append("phone", phone) };
    if (about) { formData.append("about", about) };
    if (avatar) { formData.append("newAvatar", avatar) }
    dispatch(updateUserNow(formData));
  }
  return (
    <div className='bg-blue-900 sm:mb-10 sm:mt-2 w-[420px] sm:w-[600px] h-[1000px]  sm:h-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20'>
      <div className="flex ml-5 my-4 gap-5 text-3xl text-black font-bold p-2">
        <span onClick={() => window.history.back()} className='pt-1 hover:text-white'>
          <IoArrowBack />
        </span>
        <h1>
          Profile
        </h1>
      </div>
      <div className='flex justify-center items-center relative duration-700'>
        {editAvatar ? null : <input onChange={handleAvatar} type="file" />}
        {editAvatar ? (
          <img className='w-48 h-48 rounded-full' src={user.avatar?.url} alt="" />
        ) : (
          avatarPreview ? (
            <img className='w-48 h-48 rounded-full object-cover' src={avatarPreview} alt="" />
          ) : (
            null
          )
        )}
        <span onClick={() => setEditAvatar(!editAvatar)} className={`w-16 h-16 rounded-full font-bold bg-green-700 absolute bottom-0 left-[55%] flex justify-center items-center ${editAvatar ? "" : "bg-orange-600"}`}>
          <CiCamera className="text-4xl" />
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
            {editName ?
              <h2 className='text-2xl font-mono'>{user.name}</h2> :
              <input type="text" placeholder={user?.name} className='text-xl font-mono py-1 px-2 bg-transparent border-2 rounded-lg' value={name} onChange={(e) => setName(e.target.value)} />
            }
            <span onClick={() => setEditName(!editName)} className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit />
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
            {editabout ?
              <h2 className='text-xl'>{user.about}</h2> :
              <textarea type="text" value={about} onChange={(e) => setAbout(e.target.value)} placeholder={user?.about} className='text-lg placeholder:text-white placeholder:text-opacity-60 font-mono py-1 px-2 bg-transparent border-2 rounded-lg' />
            }
            <span onClick={() => setEditAbout(!editabout)} className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit />
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
            {editPhone ?
              <h2 className='text-2xl'>+92{user.phone}</h2> :
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={user?.phone} className='text-lg placeholder:text-white placeholder:text-opacity-60 font-mono py-1 px-2 bg-transparent border-2 rounded-lg' />
            }
            <span onClick={() => setEditphone(!editPhone)} className='hover:text-orange-500 text-2xl cursor-pointer'>
              <MdEdit />
            </span>
          </span>
        </span>
      </div>
      <div className='flex m-2 p-4 gap-6 justify-end'>
        <button onClick={handleUpdate} className='px-4 py-2 bg-orange-600 rounded'>Update Profile</button>
      </div>
    </div>
  )
}

export default ProfileDetail