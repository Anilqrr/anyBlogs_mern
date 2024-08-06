import React from 'react'
import { useSelector } from 'react-redux'
import View_Blog from './View_Blog'
export default function UserSearchBlogs() {
    const { blog, searchdata, catblog, pending } = useSelector(state => state.blog)
    return (
        <>
            {searchdata && <>{pending === false ? <div className="container">

                {blog.success === true ? <div className="blogs">

                    {
                        blog.blog.map((e) => {
                            return e.title === searchdata && <View_Blog key={e._id} all={true} blog={{
                                id: e._id,
                                author: e.author,
                                username: e.username,
                                profile: e.profile_img,
                                title: e.title,
                                desc: e.description,
                                blog_img: e.blog_img,
                                all: false,
                                full: false
                            }}
                            />



                        })
                    }
                </div> : <div className='blog_not'>Blog Not Found!</div>}
            </div> : <p>Loading...</p>}</>}
        </>
    )
}
