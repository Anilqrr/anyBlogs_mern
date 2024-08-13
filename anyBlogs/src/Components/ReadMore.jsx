import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Profile_img from '../assets/user-logo.png'
import { useParams } from 'react-router-dom'
import View_Blog from '../Components/View_Blog'
import { Link } from 'react-router-dom'
import { FullBlogGet } from '../redux/blog'
export default function ReadMore() {
  const { id } = useParams()
  const { fullblog, pending } = useSelector(state => state.blog)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(FullBlogGet(id))
  }, [])
  return (
    <>




      {pending === false ? <div className='readmore'>
        {
          fullblog && fullblog.success === true ? <div className='blogs'>{<View_Blog key={fullblog.blog._id} blog={{
            id: fullblog.blog._id,
            author: fullblog.blog.author,
            username: fullblog.blog.username,
            profile: fullblog.blog.profile_img,
            title: fullblog.blog.title,
            desc: fullblog.blog.description,
            blog_img: fullblog.blog.blog_img,
            all: true,
            full: true
          }}
          />}</div> : "Blog Not Found"
        }
      </div> : "Loaifni"}
    </>
  )
}
