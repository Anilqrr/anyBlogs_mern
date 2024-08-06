import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { UserBlogCommentEdit } from '../redux/comment'
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../Components/Loading'
import 'react-toastify/dist/ReactToastify.css';
export default function UserCommentEdit() {
  const { id } = useParams()
  const [edit, setEdit] = useState([])
  const { commenteditget, commentedit, pending } = useSelector(state => state.comments)
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(UserBlogCommentEdit(edit))
    // setEdit({})
  }

  const notifywarn = () => toast.warn('Please Valid Data Enter!');
  const notifysuccess = () => toast.success('Your Commenst SuccessFullly Edited!');

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    if (pending === false) {
      setEdit(commenteditget.comment)
    }
  }, [pending === false])
  return (
    <>
      {pending === false ? <div className='commenet-edit'>
        {commenteditget.success === true ? <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="comment" value={edit.comment || " "} onChange={handleChange} id="comments" minLength={4} placeholder='Comments....' />
          </div>
          <div className="form-group">
            <button type="submit" onClick={() => {
              commentedit.success === true ? notifysuccess() : ""
              commentedit.success === false ? notifywarn() : ""
            }}>Edit</button>
          </div>
        </form> : "Comment Not Found"}
      </div> : <Loading />}
      <ToastContainer />
    </>
  )
}
