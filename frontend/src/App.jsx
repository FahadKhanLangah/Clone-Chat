import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile/Profile';
import Conversation from './Components/Conversation/Conversation';
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
    path : '/conversation/:id',
    element : < Conversation />
  }
])
function App() {
  return (
    <><div className='w-full h-full flex justify-center items-center'>
      <RouterProvider router={route} />
    </div>
    </>
  )
}

export default App
