import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile/Profile';
import Conversation from './Components/Conversation/Conversation';
import Game from './Components/Game/Game';
import { ToastContainer } from 'react-toastify';
import ProfileDetail from './Components/Profile/ProfileDetail';
const route = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path : '/profile',
    element : <Profile/>
  },
  {
    path : '/profile/me',
    element : <ProfileDetail/>
  },
  {
    path : '/conversation/:id',
    element : < Conversation />
  },
  {
    path : '/game/:id',
    element : < Game />
  }
])
function App() {
  return (
    <><div className='w-full h-full flex justify-center items-center'>
      <RouterProvider router={route} />
      <ToastContainer/>
    </div>
    </>
  )
}

export default App
