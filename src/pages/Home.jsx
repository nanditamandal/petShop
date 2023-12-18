import { useContext } from 'react'
import { MyContext } from '../context/MyContext'
import { useAuth0 } from '@auth0/auth0-react';
import { Link, Navigate } from 'react-router-dom';

function Home() {

    const {loginWithPopup, isAuthenticated, user, logout }=useAuth0();
    const {name, setName} =useContext(MyContext);
    const {loginUser, setLoginUser} =useContext(MyContext);
    setLoginUser(user);
    console.log(loginUser)
  return (
   <>
    <div>Home {name}</div>
    <button className="btn btn-primary" onClick={()=>setName("mimi")}> change name</button>
    {
      isAuthenticated ?<button className="btn btn-primary" onClick={()=> logout(<Link to="/products" />)} > log out</button>:
      <button className="btn btn-primary" onClick={()=> loginWithPopup()}> log in</button>

    }
   
  
   </>
  )
}

export default Home