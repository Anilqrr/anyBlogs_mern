import React, { useEffect, useState } from 'react'
import F from '../assets/user.jfif'
import B_img from '../assets/blog-bg.png'
import { UserBlogAdd } from '../redux/blog.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function User_Add_Blog() {
    const navigate = useNavigate()
    const { blogadd, pending } = useSelector(state => state.blog)
    const dispatch = useDispatch()
    const [Blog, setBlog] = useState(
        {
            title: '',
            categorys: '',
            description: '',
            blog_img: ''
        }
    )

    const handelChange = (e) => {
        setBlog({ ...Blog, [e.target.name]: e.target.value })
    }

    const notifywarn = () => toast.warn('Please Valid Data Enter!');
    const notifysuccess = () => toast.success('Your Blog SuccessFullly Posted!');

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(UserBlogAdd(Blog))

        // setBlog(
        //     {
        //         title: '',
        //         categorys: '',
        //         description: '',
        //         blog_img: ''
        //     }
        // )
    }
    const handleError = () => {
        if (blogadd.success === true) {
            notifysuccess()
            setBlog(
                {
                    title: '',
                    categorys: '',
                    description: '',
                    blog_img: ''
                }
            )
        }
        if (blogadd.success === false) {
            notifywarn()
        }
    }
    return (
        <>

            {<div className='addblog'>

                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group img-upload">
                        <label htmlFor="blogimg"><img src={Blog.blog_img || B_img} alt="" /></label>
                        <input type="file" name="blog_img" id="blogimg" accept='.png, .jpg, .jpeg' onChange={async (e) => {
                            const file = await e.target.files[0]
                            const base64 = await convertToBase64(file)
                            await setBlog({ ...Blog, blog_img: base64 })

                        }} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="title" minLength={3} maxLength={20} id="title" placeholder='Title' value={Blog.title} onChange={handelChange} />
                    </div>
                    <div className="form-group">
                        <select name="categorys" id="categorys" value={Blog.categorys} onChange={handelChange} >
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
                        <textarea name="description" id="description" cols="30" rows="10" minLength={10} value={Blog.description} placeholder='Description' onChange={handelChange}></textarea>
                    </div>
                    <div className="form-group">
                        <button type='submit' onClick={handleError}>Add Blog</button>
                    </div>
                </form>
            </div>}
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
