import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { UserGetBlogs } from '../redux/blog'
import View_Blog from './View_Blog'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadMore from './ReadMore'
export default function User_Blogs() {
  // const {setEdit} = useContext(Context)
  const { blog, blogadd, pending } = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const notifysuccess = () => toast.success('Your Blog SuccessFullly Posted!');

  useEffect(() => {
    // if(pending===false)
    //   {
    //     setEdit({})
    //   }
    dispatch(UserGetBlogs())
  }, [])

  return (
    <>
      {pending === false ? <><div className='user-blogs'>
        <div className="add-blog">
          <Link to='/user/add-blog'><button>Add Blog</button></Link>
        </div>

      </div>
        <div className="container">
          {blog.success === true && <div className="blogs">

            {blog.success === true ? blog.blog.map((e) => {
              return (
                <View_Blog key={e._id} blog={{
                  id: e._id,
                  author: e.author,
                  username: e.username,
                  profile: e.profile_img,
                  title: e.title,
                  desc: e.description,
                  blog_img: e.blog_img,
                  all: false,
                  full: false
                }} />

              )
            })
              : ""
            }



          </div>}</div>

      </> : <p>Loading....</p>}
      <ToastContainer />
    </>
  )
}
