import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BG from '../assets/bg-blog.jpg'
import Profile_img from '../assets/user-logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserProfile } from '../redux/reducer'
export default function Profile() {
    const [user, setUser] = useState([])
    const navigate = useNavigate()

    const User = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(UserProfile())
        //  setUser(User.user.payload)
    }, [])
    return (
        <>

            {User.pending === false ? <div><div className='user-profile'>
                <div className="bg-image">
                    <img src={User.user.success === true ? User.user.user.bg_img || BG : ""} alt="" />
                </div>
                <div className="profile-image">
                    <img src={User.user.success === true ? User.user.user.profile_img || Profile_img : ""} alt="" />

                    <p>@{User.user.success === true ? User.user.user.username : ""}</p>
                    <div className="desc">
                        {
                            User.user.success === true ? <p>{User.user.user.bio}</p> || <p>Write Your Bio...</p> : ""
                        }
                    </div>
                </div>
            </div>

                <div className="profile-info">
                    <div className="box">
                        <Link to="/user/userblogs"><div className="blog-info">
                            <h3>Blogs</h3> <p>&gt;</p>
                        </div></Link>
                        <Link to="/user/editprofile"><div className="setting blog-info">
                            <h3>Profile Change</h3>
                            <p>&gt;</p>
                        </div></Link>
                        <Link to="/user/password/change"><div className="setting blog-info">
                            <h3>Password Change</h3>
                            <p>&gt;</p>
                        </div></Link>
                        <Link to="/user/blog/comments"><div className="comments blog-info">
                            <h3>Comments</h3>
                            <p>&gt;</p>
                        </div></Link>
                        <div className="logout">
                            <h3 onClick={async () => {
                                await localStorage.removeItem('auth-token')
                                await dispatch(UserProfile())
                                if (!localStorage.getItem('auth-token')) {
                                    navigate('/login')
                                }
                            }}>Logout</h3>
                        </div>
                    </div>
                </div></div> : <p>Loading...</p>}
        </>
    )
}
