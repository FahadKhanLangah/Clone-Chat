import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, RegisterUserNow } from "../Redux/Actions/userAction";
import { toast, ToastContainer } from 'react-toastify'
import image from '../assets/image.png'

const Register = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();
  const handleAvatar = (e) => {
    const file = e.target.files[0]
    setAvatar(file);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  }
  const { isAuth, loading, error } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuth) {
      navigate('/')
    }
  }, [error, isAuth, navigate])
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    console.log(formData)
    dispatch(RegisterUserNow(formData));
  }
  return (
    <div className="backdrop-blur-xl bg-opacity-40 mt-56 p-2 sm:mt-20  w-[100%] sm:w-[600px] sm:mb-72 mb-96">
      <ToastContainer />
      <div className="text-3xl font-bold p-6">
        Register Page
      </div>
      <form onSubmit={handleRegister} className="">
        <div className="flex justify-center items-center">
          <div className="sm:p-8">
            <legend className="flex gap-5 justify-between p-2">
              <h1 className="h-15 text-xl">Name</h1>
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="px-3 h-10 py-2 rounded text-black text-xl" placeholder="Fahad" />
            </legend>
            <legend className="flex gap-5 justify-between p-2">
              <h1 className="h-15 text-xl">Phone</h1>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="px-3 h-10 py-2 rounded text-black text-xl" placeholder="3030303030" />
            </legend>
            <legend className="flex gap-5 justify-between p-2">
              <h1 className="h-15 text-xl">Password</h1>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="px-3 rounded h-10 py-2 text-black text-xl" placeholder="******" />
            </legend>
            <div>
            </div>
            <div className="flex gap-3 w-[400px]">
              <h1 className="w-[30%] ml-2">Avatar</h1>
              <input className="w-[30%]" type="file" onChange={handleAvatar} />
              <img className="h-16 w-16 rounded-full" src={avatarPreview || image} alt="Missing" />
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-4">
          <button disabled={loading} type="submit" className="text-xl hover:bg-green-500 duration-150 hover:font-bold bg-orange-500 px-4 py-2 rounded">
            Register
          </button>
        </div>
      </form>
      <div className="mt-10">
        Already have acount ??
        <Link to={'/login'}><button className="hover:underline px-8">Login</button></Link>
      </div>
    </div>
  )
}

export default Register