import React, { useEffect, useState } from 'react'
import Profile_img from '../assets/user-logo.png'
import BG from '../assets/bg-blog.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserProfileEdit } from '../redux/reducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Profile_Edit() {
    const [User, setUser] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        country: '',
        birthdate: '',
        bio: '',
        profile_img: '',
        bg_img: ''
    })
    const navigate = useNavigate()

    const { user, pending, edit } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(UserProfileEdit(User))
    }

    const handleChange = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }

    const notifywarn = () => toast.warn('Please Valid Data Enter! or Password Not Enter!');
    const notifysuccess = () => toast.success('Your Data SuccessFullly Updated');



    useEffect(() => {
        if (pending === false) {
            setUser(user.user)
        }
    }, [pending === false])

    return (
        <>




            {pending === false ? <div className='profile-edit'>

                <form onSubmit={handleSubmit}>
                    <div className="form-group bg-img-p" >
                        <label htmlFor="bg-img" title='Background Image Upload' className='bg'><img src={user.success === true ? User.bg_img || user.bg_img || BG : ""} alt="" /></label>
                        <input type="file" name="" onChange={async (e) => {
                            const file = await e.target.files[0]
                            const base64 = await convertToBase64(file)
                            await setUser({ ...User, bg_img: base64 })

                        }} id="bg-img" accept='.png .jpg' required />
                    </div>
                    <div className="form-group p-img-p">
                        <label htmlFor="p-img" title='Profile Image Upload' className='pro'><img src={user.success === true ? User.profile_img || Profile_img : ""} alt="" /></label>
                        <input type="file" name="" onChange={async (e) => {
                            const file = await e.target.files[0]
                            const base64 = await convertToBase64(file)
                            await setUser({ ...User, profile_img: base64 })

                        }} id="p-img" accept='.png .jpg' required />
                    </div>
                    <div className="form-group">
                        <input type="text" name="username" onChange={handleChange} minLength={3} id="user" value={user.success === true ? User.username || user.username : ""} maxLength={15} required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" value={user.success === true ? User.email : ""} id="email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="password" onChange={handleChange} name="password" minLength={6} maxLength={8} id="password" placeholder='Password' required />
                    </div>
                    <div className="form-group flex">

                        M<input type="radio" name="gender" onChange={handleChange} checked={user.success === true && User.gender === "m"} value='m' id="m" required />

                        F<input type="radio" checked={user.success === true && User.gender === "f"} name="gender" onChange={handleChange} value='f' id="f" required />
                    </div>
                    <div className="form-group">
                        <input type="text" value={user.success === true ? User.country : ""} name="country" onChange={handleChange} id="country" required />
                    </div>
                    <div className="form-group">
                        Birthdate<input type="date" value={user.success === true ? User.birthdate : ""} onChange={handleChange} name="birthdate" id="birthdate"
                            required />
                    </div>

                    <div className="form-group">
                        <textarea name="bio" id="" cols="30" rows="10" placeholder='Bio' value={user.success === true ? User.bio || " " : ""} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button type='submit' onClick={() => {
                            edit.success === true ? notifysuccess() : ""
                            edit.success === false ? notifywarn() : ""
                        }}>Edit Profile</button>
                    </div>
                    <ToastContainer />
                </form>
            </div> : <p>Loding...</p>}


        </>
    )
}


function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    })
}