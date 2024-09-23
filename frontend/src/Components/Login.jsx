import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { clearErrors, LoginUserNow } from "../Redux/Actions/userAction";

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth, loading, error } = useSelector((v) => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors());
    }
    if (isAuth) {
      navigate('/')
    }
  }, [error, isAuth, navigate, dispatch])
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("password", password)
    console.log(formData);
    dispatch(LoginUserNow(formData))
  }
  return (
    <div className="backdrop-blur-xl bg-opacity-40 mt-56 p-2 sm:mt-20  w-[100%] sm:w-[600px] sm:mb-72 mb-96">
      <ToastContainer/>
      <div className="text-3xl font-bold p-6">
        Login Page
      </div>
      <form onSubmit={handleLogin} className="mt-10">
        <div className="flex justify-center items-center">
          <div className="sm:p-8">
            <legend className="flex gap-5 justify-between p-2">
              <h1 className="h-15 text-xl">Phone</h1>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="px-3 h-10 py-2 rounded text-black text-xl" placeholder="3030303030" />
            </legend>
            <legend className="flex gap-5 justify-between p-2">
              <h1 className="h-15 text-xl">Password</h1>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="px-3 rounded h-10 py-2 text-black text-xl" placeholder="******" />
            </legend>
          </div>
        </div>
        <div className="flex justify-end mr-4">
          <button disabled={loading} type="submit" className="text-xl hover:bg-green-500 duration-150 hover:font-bold bg-orange-500 px-4 py-2 rounded">
            Login
          </button>
        </div>
      </form>
      <div className="mt-10">
        New to FK Chat ??
        <Link to={'/register'}><button className="hover:underline px-8">Sign up</button></Link>
      </div>
    </div>
  )
}

export default Login