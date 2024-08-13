import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ContactFeedback } from '../redux/reducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Contact() {
  const [contatc, setContent] = useState({
    feedback: ""
  })
  const { user, feedback, pending } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(ContactFeedback(contatc));

  }

  const notifywarn = () => toast.warn('Pleace Enter at least 10 characters!');
  const notifysuccess = () => toast.success('Your feedback SuccessFullly send!');

  const handleChange = (e) => {
    setContent({ ...contatc, [e.target.name]: e.target.value })
  }
  return (
    <div className='contact'>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="username" value={pending === false && user.success === true && user.user.username || ""} id="" placeholder='Enter UserName..' readOnly />
        </div>
        <div className="form-group">
          <textarea name="feedback" id="feedback" cols="30" value={contatc.feedback || ""} onChange={handleChange} rows="10" placeholder='Enter Message...'></textarea>
        </div>
        <div className="form-group">
          <button type='submit' onClick={() => {
            feedback && feedback.success === true ? notifysuccess() : ""
            feedback && feedback.success === false ? notifywarn() : ""
            feedback.success === true ? setContent({
              feedback: ""
            }) : ""
          }}>Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
