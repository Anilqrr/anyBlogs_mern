import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupUser } from '../redux/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  // const [gender, setGender] = useState()
  const User = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(SignupUser(user))
    User.user.payload.success === true && navigate('/')
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const notify = () => toast.warn('Please Valid Data Enter! or Username already');


  return (
    <>
      {
        User.user.payload && User.user.payload.success === true && navigate('/')
      }

      <div className='signup'>
        <form action="" method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" onChange={handleChange} minLength={3} maxLength={15} name="username" id="username" placeholder='UserName' required />
          </div>
          <div className="form-group">
            <input type="email" name="email" onChange={handleChange} id="email" placeholder='Email' required />
          </div>
          <div className="form-group">
            <input type="password" name="password" minLength={6} maxLength={8} onChange={handleChange} id="password" placeholder='Password' required />
          </div>
          <div className="form-group flex">
            M<input type="radio" value="m" onChange={handleChange} name="gender" id="m" required />
            F<input type="radio" value="f" onChange={handleChange} name="gender" id="f" required />
          </div>
          <div className="form-group">
            <input type="text" name="country" onChange={handleChange} id="country" placeholder='Country' required />
          </div>
          <div className="form-group">
            BirthDate<input type="date" onChange={handleChange} name="birthdate" id="birthdate" />
          </div>
          <div className="form-group">
            <button type='submit' onClick={(e) => {
              // e.preventDefault();

              User.user.payload && User.user.payload.success === false && notify()


            }}>Signup</button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  )
}
