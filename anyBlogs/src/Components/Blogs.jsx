import React, { useEffect } from 'react'
import { AllBlogGet, CategoryWiseGetData } from '../redux/blog'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Profile_img from '../assets/user-logo.png'
import View_Blog from './View_Blog'
import ReadMore from './ReadMore'
import Loading from './Loading'
export default function Blogs({ param }) {
  const { blog, catblog, pending } = useSelector(state => state.blog)
  const dispatch = useDispatch()
  useEffect(() => {
    // if(pending===false){
    // if(param){

    // dispatch(CategoryWiseGetData(param))
    // }
    dispatch(AllBlogGet())
    // }

  }, [])
  return (
    <>
      <main>





        {!param && <>{pending === false ? <div className="container">

          {blog.success === true && <div className="blogs">

            {
              blog.blog.map((e) => {
                return <View_Blog key={e._id} all={true} blog={{
                  id: e._id,
                  author: e.author,
                  username: e.username,
                  profile: e.profile_img,
                  title: e.title,
                  desc: e.description,
                  blog_img: e.blog_img,
                  all: true,
                  full: false
                }}
                />



              })
            }
          </div>}
        </div> : <Loading />}</>}


        {param && <>{pending === false ? <div className="container">
          {catblog.success === true ? <div className="blogs">

            {
              catblog.blog.map((e) => {

                return <View_Blog key={e._id} all={true} blog={{
                  id: e._id,
                  author: e.author,
                  username: e.username,
                  profile: e.profile_img,
                  title: e.title,
                  desc: e.description,
                  blog_img: e.blog_img,
                  all: true,
                  full: false
                }}
                />




              })
            }
          </div> : <div className='blog_not'>Blog Not Found!</div>}
        </div> : <Loading />}</>}
      </main>
    </>
  )
}
