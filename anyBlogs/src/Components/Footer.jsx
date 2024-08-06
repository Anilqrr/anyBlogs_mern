import React, { useState } from 'react'
import Linkedin from '../assets/linkedin.png'
import Github from '../assets/github.png'
import { Link } from 'react-router-dom'
export default function Footer() {
    // const [date, setDate] = useState({ date: new Date.getFullYear() })

    return (
        <footer>
            <div className="footer">
                <div className="logo">
                    <h2>anyBlogs.</h2>
                </div>
                <div className='copyright'>
                    anyBlogs.com &copy; All Right Reserved {(new Date().getFullYear())}
                </div>
                <div className="real-profile">
                    <Link to={'https://www.linkedin.com/in/anil-kantariya-5a4277244'}><img src={Linkedin} alt="Anil Kantariya" /></Link>
                    <Link to={'https://github.com/Anilqrr?tab=repositories'}><img src={Github} alt="Anilqrr" /></Link>
                </div>
            </div>
            <div className="real-info">
                <p>Develop By Anil Kantariya</p>
            </div>
        </footer>
    )
}
