import React, { useEffect, useLayoutEffect, useState, useCallback, useContext } from 'react'
import B_img from '../assets/blog-bg.png'
import { useSelector, useDispatch } from 'react-redux'
import { UserBlogEditGet, UserBlogEdit } from '../redux/blog'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {Context} from '../context/Context'
export default function User_Edit_Blog() {
    // const {edit, setEdit} = useContext(Context)
    const { id } = useParams()
    const [edit, setEdit] = useState({})
    const { blogget, pending, blogedit } = useSelector(state => state.blog)
    const User = useSelector(state => state.user)
    const dispatch = useDispatch()




    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(UserBlogEdit(edit))
        // setEdit({})
    }

    const notifywarn = () => toast.warn('Please Valid Data Enter!');
    const notifysuccess = () => toast.success('Your Blog SuccessFullly Edite and Posted!');

    const handleChange = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (pending === false) {
            setEdit(blogget.blog)
        }
    }, [pending === false])

    return (
        <>


            {pending === false ? <div className='editblog'>
                <form action='' onSubmit={handleSubmit}>
                    <div className="form-group img-upload">
                        <label htmlFor="blogimg">{<img src={edit.blog_img || B_img} alt="" />}</label>
                        <input type="file" name="blog_img" id="blogimg" onChange={async (e) => {
                            const file = await e.target.files[0]
                            const base64 = await convertToBase64(file)
                            await setEdit({ ...edit, blog_img: base64 })

                        }} accept='.png .jpg' />
                    </div>
                    <div className="form-group">
                        <input type="text" name="title" minLength={3} maxLength={20} value={edit.title || ""} onChange={handleChange} id="" placeholder='Title' />
                    </div>
                    <div className="form-group">
                        <select name="categorys" id="categorys" value={edit.categorys || ""} onChange={handleChange}>
                            <option value="">Select Categories....</option>
                            <option value="news">News</option>
                            <option value="internet">Internet</option>
                            <option value="it">It</option>
                            <option value="Bank">Bank</option>
                            <option value="ai">Ai</option>
                            <option value="science">Science</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea name="description" id="title" cols="30" onChange={handleChange} minLength={10} value={edit.description || ""} rows="10" placeholder='Description'></textarea>
                    </div>
                    <div className="form-group">
                        <button type='submit' onClick={() => {
                            blogedit.success === true ? notifysuccess() : ""
                            blogedit.success === false ? notifywarn() : ""
                            //    if(blogedit.success===false)
                            //     {
                            //         dispatch(UserBlogEditGet(id))
                            //     }
                        }}>Edit Blog</button>
                    </div>
                </form>
            </div> : <p>Loading</p>}
            <ToastContainer />
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