import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

  const {cartList} =useContext(MyContext);
  const {loginWithPopup, isAuthenticated, user, logout }=useAuth0();
  const {loginUser, setLoginUser} =useContext(MyContext);
  setLoginUser(user);
  console.log(loginUser)
  return (
    <>
<div className="navbar bg-base-100">
  <div className="flex-1 flex justify-between"> 
    <a className="btn btn-ghost text-xl">daisyUI</a>
    <div>
      <Link to={`/home`}>Home</Link>
      <Link to={`/products`}>Products</Link>
      <Link to={`/card`}>Card</Link>
    </div>
 
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">{cartList.length}</span>
        </div>
      </div>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{cartList.length} Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
           <Link to={`/cart`}>
           <button className="btn btn-primary btn-block">View cart</button>
           
           </Link>
          </div>
        </div>
      </div>
    </div>
    {
      isAuthenticated ?<button className="btn btn-warning" onClick={()=> logout(<Link to="/products" />)} > log out</button>:
      <button className="btn btn-success" onClick={()=> loginWithPopup()}> log in</button>

    }
    {/* <button className="btn btn-success">Log In </button>
    <button className="btn btn-warning">Log Out</button> */}

    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>




    </>
  )
}

export default Navbar