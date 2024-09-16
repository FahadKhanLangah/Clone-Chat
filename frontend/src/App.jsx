import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
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
