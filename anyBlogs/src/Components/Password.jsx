import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UserPasswordChange } from '../redux/reducer';

export default function () {

    const [change, setChange] = useState({
        password: ""
    })
    const { password_c, pending } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(UserPasswordChange(change))
        // setEdit({})
    }
    const notifywarn = () => toast.warn('Please Valid Data Enter!');
    const notifysuccess = () => toast.success('Your Commenst SuccessFullly Edited!');

    const handleChange = (e) => {
        setChange({ ...change, [e.target.name]: e.target.value })
    }
    return (
        <>
            {localStorage.getItem('auth-token') && pending === false ? <div className='password-change'>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" name="password" value={change.password || ""} id="password" minLength={6} maxLength={8} placeholder='New Password....' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={() => {
                            password_c.success === true && notifysuccess();
                            password_c.success === true && setChange({
                                password: ""
                            })
                            password_c.success === false && notifywarn();
                        }}>Password Change</button>
                    </div>
                </form>
            </div> : <Loading />}
            <ToastContainer />
        </>
    )
}
