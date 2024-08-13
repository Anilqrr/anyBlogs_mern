import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Profile_img from '../assets/user-logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { UserProfile } from '../redux/reducer'
import Hamburger from 'hamburger-react'
export default function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const User = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(UserProfile())
  }, [])
  return (
    <>

      <nav>
        <div className="logo">
          <Link to='/'><h2>anyBlogs.</h2></Link>
        </div>
        <ul className={isOpen === true && 'responsive'}>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          {localStorage.getItem('auth-token') ? <li><Link to='/user/userblogs'>Blogs</Link></li> : ""}
          <li><Link to='/contact'>Contact</Link></li>
          <li>{localStorage.getItem('auth-token') ? <Link to='/profile'>{User.pending === false ? isOpen === true ? "Profile" : <img src={User.user.success === true && User.user.user.profile_img || Profile_img} alt="anyBlogs" /> : ""}</Link> :
            <Link to='/login'><li>Login</li></Link>}</li>
        </ul>
        <input type="checkbox" id='check' />
        <label className="hamburger" htmlFor='check' onClick={() => setOpen(!isOpen)}>
          <Hamburger size={20} toggled={isOpen} toggle={setOpen} />
        </label>
      </nav >
    </>
  )
}
{/*  */ }