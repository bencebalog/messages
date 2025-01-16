import { useState, useEffect } from 'react'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Layout from './Layout.jsx'
import Messages from './Pages/Messages.jsx'
import Users from './Pages/Users.jsx'
import About from './Pages/About.jsx'
import Login from './Pages/Login.jsx'
import Notfound from './Pages/Notfound.jsx'

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../FireBaseConfig.js";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Admin from './Pages/Admin.jsx'

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default function App() {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if(currentUser && currentUser.email=="zoliszia@gmail.com") setAdmin(true)
        else setAdmin(false);
      })
    return () => unsubscribe;
  },[]);

  async function logout() {
    await signOut(auth);
  }

  const router = createBrowserRouter([
    { path: "/", element: <Layout user={user} logout={logout} admin={admin} />, children:[
      { path: "/", element: <Messages user={user} db={db} /> },
      { path: "/users", element: <Users db={db} /> },
      { path: "/about", element: <About /> },
      { path: "/admin", element: <Admin admin={admin} /> },
      { path: "/login", element: <Login auth={auth} /> },
      { path: "*", element: <Notfound /> }
    ]}
  ],{basename :'/messages/'});

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}
