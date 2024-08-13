import React, { useEffect, useState, useCallback } from 'react'
import Profile_img from '../assets/user-logo.png'
import { Link } from 'react-router-dom'
import { BlogCommentGets, UserBlogCommentSend } from '../redux/comment'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import View_Comment from './View_Comment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading'

export default function Comment() {
  const id = useParams()
  const [send, setSend] = useState({
    comment: ""
  })
  const { comment, commentsend, pending } = useSelector(state => state.comments)
  const dispatch = useDispatch()

  const notifywarn = () => toast.warn('Please Login!');
  const notifysuccess = () => toast.success('Your Blog SuccessFullly Posted!');

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(UserBlogCommentSend(send))

  }
  const handleChange = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value, id: id.id })
  }

  useEffect(() => {
    dispatch(BlogCommentGets(id))
    commentsend && pending === false ? setSend({
      comment: ""
    }) : ""

  }, [commentsend])
  return (
    <>



      {pending === false ? <div className='comments'>

        {comment.success === true ? <>
          {

            comment.comments.map((e) => {
              return <View_Comment User={false} key={e._id} profile_img={e.profile_img}
                username={e.username} date={e.date}
                comment={e.comment}
              />
            })
          }
        </> : "Comment Not Found"}
      </div> : <Loading />
      }
      <div className="comment-box">
        <form action="" method='post' onSubmit={handleSubmit}>
          <input type="text" name="comment" value={send.comment || ""} onChange={handleChange} id="comment" placeholder='Send a comment of at least 4 Characters....' minLength={4} />
          <button type='submit'><svg className='svg-c' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" /></svg></button>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}
