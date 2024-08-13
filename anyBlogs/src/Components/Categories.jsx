import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CategoryWiseGetData } from '../redux/blog'
import { useDispatch, useSelector } from 'react-redux'


export default function Categories({ param }) {
  const {name} = useParams()
  const dispatch = useDispatch()
  // const Blog = useSelector(state=>state.blog.catblog)
  const User = useSelector(state=>state.user)
  useEffect(()=>{
    dispatch(CategoryWiseGetData(param))
  },[param])
  return (
    <div className="categories">
      <ul>
        <li><Link to={'/'}>All</Link></li>
        <li><Link to='/it'>It</Link></li>
        <li><Link to={'/internet'}>Internet</Link></li>
        <li><Link to='/news'>News</Link></li>
        <li><Link to={'/ai'}>Ai</Link></li>
        <li><Link to={'/bank'}>Bank</Link></li>
        <li><Link to={'/science'}>Science</Link></li>
      </ul>
    </div>
  )
}
