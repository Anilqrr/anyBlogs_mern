import React from 'react'
import Profile_img from '../assets/user-logo.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UserBlogCommentDelete, UserBlogCommentEditGet, UserBlogsCommentedGets } from '../redux/comment'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function View_Comment(props) {
  const { profile_img, username, date, comment, title, User, id } = props
  const { commentdelete, pending } = useSelector(state => state.comments)
  const dispatch = useDispatch()

  const notifysuccess = () => toast.success('Your Comment SuccessFullly Removed!');

  return (
    <>
      {pending === false ? <div className="box">
        <div className="user-profile-c">
          <img src={profile_img || Profile_img} alt="" />
          <p>@{username}</p>
          <div className="datetime">
            <p>{date.slice(0, 10)}</p>
            {/* <p>12:00 PM</p> */}
          </div>
        </div>
        <div className="user-comment">
          {User === true && <h3>{title}</h3>}
          <p>{comment}</p>
        </div>
        {User === true && <div className="edit-delete">
          <Link to={`/user/blog/comments/edit/${id}`} onClick={() => {
            dispatch(UserBlogCommentEditGet(id))
          }}><svg className='svg' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg></Link>

          <Link to='/user/blog/comments' onClick={async () => {
            await dispatch(UserBlogCommentDelete(id))
            await dispatch(UserBlogsCommentedGets())
            commentdelete && commentdelete.success === true && notifysuccess()
          }}><svg className='svg' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" /></svg></Link>
        </div>}
      </div> : "Loading"}
      <ToastContainer />
    </>
  )
}
