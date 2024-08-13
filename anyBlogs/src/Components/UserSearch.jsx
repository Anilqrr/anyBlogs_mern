import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBlog } from '../redux/blog'
import { useSelector, useDispatch } from 'react-redux'
export default function UserSearch() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [data, setData] = useState([{
        title: ""
    }])
    const { blog, pending } = useSelector(state => state.blog)
    const dispatch = useDispatch()

    const handleCahnge = (e) => {
        setSearch(e.target.value)
    }
    return (
        <>
            <div className="search">
                <form method='post'>
                    <input type="text" name="search" value={search || ""} onChange={handleCahnge} id="search" placeholder='User Search anyBlogs....' />
                    <button type='submit' onClick={(e) => {
                        e.preventDefault()
                        search !== "" && dispatch(SearchBlog(search))
                        search !== "" && navigate('/user/blog/search')
                        setSearch("")
                    }}><svg className="svg-c" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button>
                </form>
            </div>

            {
                pending === false && blog.success === true &&
                <div className='search-suggestion'>{blog.blog.map((e) =>

                    search !== "" && e.title.toLowerCase().includes(search.toLowerCase()) &&

                    <ul key={e._id}>
                        <li onClick={
                            () => {
                                setSearch(e.title)
                            }
                        }

                        >{e.title}</li>
                    </ul>


                )}
                </div >

            }
        </>
    )
}
