import { useRoutes } from 'react-router-dom'

import { ProtectedRoute } from './Auth';
import LoginPage from './LoginPage'
import Home from './Home';

import './App.css'
import Profile from './Profile';
import Navbar from './Navbar';

function App() {
  const routes = useRoutes([
    {
      index: true,
      element: <Home />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/profile',
      element: <ProtectedRoute><Profile /></ProtectedRoute>
    },
  ])
  
  return (
    <>
      <Navbar />
      {routes}
    </>
  );
}

export default App
