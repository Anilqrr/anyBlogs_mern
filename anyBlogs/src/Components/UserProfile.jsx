import React, { useEffect } from 'react'
import BG from '../assets/bg-blog.jpg'
import Profile_img from '../assets/user.jfif'
import { UserProfileView } from '../redux/UserView'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function UserProfile() {
    const { id } = useParams()
    const { userview, pending } = useSelector(state => state.userview)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(UserProfileView(id))

    }, [])
    return (
        <>

            {pending === false ? <div><div className='user-profile'>
                <div className="bg-image">
                    <img src={userview.success === true ? userview.user.bg_img || BG : ""} alt="" />
                </div>
                <div className="profile-image">
                    <img src={userview.success === true ? userview.user.profile_img || Profile_img : ""} alt="" />
                    <p>@{userview.success === true ? userview.user.username : ""}</p>
                    <div className="desc">
                        {
                            userview.success === true ? <p>{userview.user.bio}</p> || <p>Write Your Bio...</p> : ""
                        }
                    </div>
                </div>
            </div>

                <div className="profile-info">
                    <div className="box">
                        <Link to={`/otheruser/userblogs/${id}`}><div className="blog-info">
                            <h3>Blogs</h3> <p>&gt;</p>


                        </div></Link>
                    </div>
                </div></div> : <p>Loading...</p>}
        </>
    )
}
