import React, { useEffect } from 'react'
import User from '../assets/logo.jfif'
import { useSelector, useDispatch } from 'react-redux'
import { UserBlogsCommentedGets } from '../redux/comment'
import View_Comment from './View_Comment'
export default function UserComments() {

  const { usercomments, pending } = useSelector(state => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(UserBlogsCommentedGets())
  }, [])

  return (
    <>
      {usercomments && pending === false ? <div className='comments'>
        {usercomments.success === true ? <>
          {
            usercomments.comment.map((e) => {
              return <View_Comment User={true} id={e._id} title={e.blog_title} key={e._id} profile_img={e.profile_img}
                username={e.username} date={e.date}
                comment={e.comment}
              />
            })
          }
        </> : "Comment Not Found"}
      </div> : "Loading..."}
    </>
  )
}
