import React, { useEffect } from 'react'
import { OtherUserBlogGet } from '../redux/blog'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import View_Blog from './View_Blog'
export default function OtherUserBlogs() {
  const { id } = useParams()
  const { otherblog, pending } = useSelector(state => state.blog)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(OtherUserBlogGet(id))

  }, [])

  return (
    <>
      {pending === false ? <div className="container">
        <div className="blogs">
          {otherblog &&
            otherblog.success === true ? otherblog.blog.map((e) => {
              return (
                <View_Blog key={e._id} blog={{
                  id: e._id,
                  author: e.author,
                  username: e.username,
                  profile: e.profile_img,
                  title: e.title,
                  desc: e.description,
                  blog_img: e.blog_img,
                  all: true,
                  full: false
                }} />

              )
            })
            : ""
          }
        </div>
      </div> : "Loading..."}
    </>
  )
}
