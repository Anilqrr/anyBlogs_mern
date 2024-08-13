import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './Css/style.css'
import './Css/media.css'
import Navbar from './Components/Navbar'
import Categories from './Components/Categories'
import Blogs from './Components/Blogs'
import About from './Components/About'
import Contact from './Components/Contact'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import User_Blogs from './Components/User_Blogs'
import User_Add_Blog from './Components/User_Add_Blog'
import User_Edit_Blog from './Components/User_Edit_Blog'
import Comment from './Components/Comment'
import Profile_Edit from './Components/Profile_Edit'

import { useDispatch, useSelector } from 'react-redux'
import { OtherUserBlogGet, UserGetBlogs } from './redux/blog'
import UserProfile from './Components/UserProfile'
import UserComments from './Components/UserComments'
import UserCommentEdit from './Components/UserCommentEdit'
import ReadMore from './Components/ReadMore'
import Search from './Components/Search'
import OtherUserBlogs from './Components/OtherUserBlogs'
import SearchBlogs from './Components/SearchBlogs'
import UserSearchBlogs from './Components/UserSearchBlogs'
import UserSearch from './Components/UserSearch'
import Footer from './Components/Footer'
import Loading from './Components/Loading'
import Password from './Components/Password'

// import { useSelector } from 'react-redux'
function App() {



  return (
    <>
      {/* {console.log(user)} */}
      <BrowserRouter>
        {/* <UserContext> */}
        <Navbar />
        <Routes>
          <Route path='/' element={<>
            <Search />
            <Categories />
            <Blogs all={true} />
          </>} />
          {/* <Blogs path='/news' all={true}/> */}
          <Route path='/it' element={<><Search /><Categories param='it' /><Blogs param='it' all={true} /></>} />
          <Route path='/internet' element={<><Search /><Categories param='internet' /><Blogs param='internet' all={true} /></>} />
          <Route path='/news' element={<><Search /><Categories param='news' /><Blogs param='news' all={true} /></>} />
          <Route path='/ai' element={<><Search /><Categories param='ai' /><Blogs param='ai' all={true} /></>} />
          <Route path='/bank' element={<><Search /><Categories param='bank' /><Blogs param='bank' all={true} /></>} />
          <Route path='/science' element={<><Search /><Categories param='science' /><Blogs param='science' all={true} /></>} />
          <Route path='/about' element={<About />} />
          <Route path='/user/userblogs' element={<><UserSearch /><User_Blogs /></>} />
          <Route path='/blog/search' element={<><Search /><Categories /><SearchBlogs /></>} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/comment/:id' element={<Comment />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/blog/search' element={<><UserSearch /><Categories /><UserSearchBlogs /></>} />
          <Route path='/user/editprofile' element={<Profile_Edit />} />
          <Route path='/user/password/change' element={<Password />} />
          <Route path='/blog/readmore/:id' element={<><Categories /><ReadMore /></>} />
          <Route path='/user/add-blog' element={<User_Add_Blog />} />
          <Route path='/user/editblog/:id' element={<User_Edit_Blog />} />
          <Route path='/user-profile/:id' element={<UserProfile />} />
          <Route path='/otheruser/userblogs/:id' element={<><Categories /><OtherUserBlogs /></>} />
          <Route path='/user/blog/comments' element={<UserComments />} />
          <Route path='/user/blog/comments/edit/:id' element={<UserCommentEdit />} />

        </Routes>
        <Footer />
        {/* </UserContext> */}
      </BrowserRouter>
    </>
  )
}

export default App
