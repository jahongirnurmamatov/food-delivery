import React, { useContext, useState } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../ context/StoreContext';
export default function Navbar({setShowLogin}) {
    const [menu, setMenu]=useState('home');
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext)

  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
        <ul className='navbar-menu'>
            <Link to={'/'} className={menu==='home'? "active":""} onClick={()=>setMenu('home')}>home</Link>
            <a href='#explore-menu' className={menu==='menu'? "active":""} onClick={()=>setMenu('menu')}>menu</a>
            <a  href='#app-download' className={menu==='mobile-app'? "active":""} onClick={()=>setMenu('mobile-app')}>mobile-app</a>
            <a  href='#footer' className={menu==='contact-us'? "active":""} onClick={()=>setMenu('contact-us')}>contact-us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0 ? "" : "dot"}></div>
            </div>
            {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>:
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile'></ul>
            </div>
            }
            
        </div>
    </div>
  )
}
