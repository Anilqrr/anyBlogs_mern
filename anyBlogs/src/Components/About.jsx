import React from 'react'
import Danger from '../assets/danger.png'
import Menus from '../assets/menus.png'
import Extra from '../assets/extra.jpg'
import Home from '../assets/home.jpg'
import Search from '../assets/search.png'
import Category from '../assets/category.jpg'
import Blog from '../assets/blog.png'
import MenusBlog from '../assets/menu-blog.jpg'
import UserProfile from '../assets/menu-profile.png'
import Future from '../assets/future.png'
export default function About() {
  return (
    <div className='about'>
      <h2>anyBlogs.</h2>
      <div className="note">
        <img src={Danger} alt="danger" />
        <p>Please do not enter your real email address as this website is created by me only for my learning purpose.</p>
      </div>
      <div className="menus-info">

        <p><img src={Menus} alt="" />There are many menus available in the navabar like website logo, home, about, contact, login.</p>

        <p><img src={Extra} alt="" />This website has added two additional menus like blog, profile when user login.</p>
        <ul>
          <li><img src={Home} alt="" />There are many sections available in the home such as search, categories asn all blogs are available</li>
          <li><img src={Search} alt="" />Any blog can be easily found using this search section in this webiste</li>
          <li><img src={Category} alt="" />Several categories are available to easily find blogs that interest you</li>
          <li><img src={Blog} alt="" />Blog Section is available under many functionalities like other user view your blog, comment and view your profile</li>
        </ul>
        <p><img src={MenusBlog} alt="" />Blog menu is available when user login to this website. In this menu user can create, edit and delete blog and also search user blogs.</p>
        <p><img src={UserProfile} alt="" />Profile menu under user shows your details and user also edit your profile.</p>
      </div>
      <div className="note">
        <img src={Future} alt="Future" />
        <p>In future user will login through Google and get verified by OTP to your email address</p>
      </div>
    </div >
  )
}
