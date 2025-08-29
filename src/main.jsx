import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Booking from './pages/Booking.jsx'
import Confirmation from './pages/Confirmation.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './styles.css'
import RequireAuth from './components/RequireAuth.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'login', element: <Login /> },

      // 🔒 Protected routes
      {
        element: <RequireAuth />,
        children: [
          { path: 'booking', element: <Booking /> },
          { path: 'confirmation', element: <Confirmation /> },
        ],
      },

      { path: '*', element: <Home /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
