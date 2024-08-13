import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { LoginUser } from '../redux/reducer';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const User = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(LoginUser(user))

  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const notify = () => toast.warn('Please Valid Data Enter!');

  return (
    <>
      {console.log(User.user)}
      {User.user.payload && User.user.payload.success === true && navigate('/')}
      <div className='login'>

        <form action="" method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="username" minLength={3} maxLength={15} onChange={handleChange} id="username" placeholder='UserName' required />
          </div>
          <div className="form-group">
            <input type="password" name="password" minLength={6} maxLength={8} onChange={handleChange} id="password" placeholder='Password' required />
          </div>
          <div className="form-group">
            <button type='submit' onClick={(e) => {
              // e.preventDefault();

              User.user.payload && User.user.payload.success === false && notify()
            }}>Login</button>
          </div>
          <div className="form-group">
            <Link to='/signup'>Create New Account</Link>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  )
}
