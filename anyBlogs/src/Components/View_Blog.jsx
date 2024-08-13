import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Profile_img from '../assets/user-logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { UserBlogDelete, UserBlogEditGet, UserGetBlogs } from '../redux/blog'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function View_Blog(props) {
  const { blogdelete, pending } = useSelector(state => state.blog)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { username, profile, title, desc, blog_img, author, id, all, full } = props.blog

  const notifysuccess = () => toast.success('Your Blog SuccessFullly Removed!');

  return (
    <>

      {pending === false ? <div className="box">

        {all === false && <div className="edit-delete">
          <Link to={`/user/editblog/${id}`} onClick={() => {
            dispatch(UserBlogEditGet(id))
          }}><svg className='svg' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg></Link>

          <Link to='/user/userblogs' onClick={async () => {
            await dispatch(UserBlogDelete(id))
            await dispatch(UserGetBlogs())
            blogdelete && blogdelete.success && notifysuccess()
          }}><svg className='svg' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" /></svg></Link>
        </div>}
        <div className="blog-image">
          <Link to={`/blog/readmore/${id}`}><img src={blog_img} alt="" /></Link>

        </div>
        <div className="blog-content">
          <div className="blog-title">
            <h3>{title}</h3>
          </div>
          <div className="blog-description">
            <p>{full === false ? desc.slice(0, 100) + "......" : desc}</p>
          </div>
        </div>
        <div className="blog-profile">
          <div className="p-info">
            <Link to={user.user && user.user.username === username ? `/profile` : `/user-profile/${author}` || `/user-profile/${author}`}> <img src={profile || Profile_img} alt="User" />
              <p>@{username}</p></Link>
          </div>
          <div className="p-comments">
            <Link to={`/comment/${id}`}><h5>Comments</h5></Link>
          </div>
        </div>
      </div> : <p>Loading</p>}

      <ToastContainer />
    </>
  )
}
