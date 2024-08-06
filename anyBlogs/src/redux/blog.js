import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
     blog: {},
}

export const AllBlogGet = createAsyncThunk(
     'all/blog',
     async () => {

          const response = await axios.get('http://localhost:5000/api/all/blogs').then((response) => {

               return response.data
          }).catch((error) => {
               console.error(error.response.data)

               return error.response.data
          })
          return response
     }
)

export const FullBlogGet = createAsyncThunk(
     'blog/getBlogs',
     async (id) => {
          const response = await axios.post(`http://localhost:5000/api/get/blog/${id}`, {}).then((response) => {


               return response.data
          }).catch((error) => {
               console.error(error.response.data)

               return error.response.data
          })
          return response
     }
)

export const OtherUserBlogGet = createAsyncThunk(
     '/other/user/getBlogs',
     async (id) => {
          const response = await axios.post(`http://localhost:5000/api/other/user/get/blog/${id}`, {}).then((response) => {


               return response.data
          }).catch((error) => {
               console.error(error.response.data)

               return error.response.data
          })
          return response
     }
)

export const UserGetBlogs = createAsyncThunk(
     'user/getBlogs',
     async () => {
          const response = await axios.post('http://localhost:5000/api/user/getblogs', {}, {
               headers: {
                    'auth-token': localStorage.getItem('auth-token')
               }
          }).then((response) => {


               return response.data
          }).catch((error) => {
               console.error(error.response.data)

               return error.response.data
          })
          return response
     }
)

export const UserBlogAdd = createAsyncThunk(
     'user/add/blog',
     async (blog) => {
          const { title, description, blog_img, categorys } = blog
          const response = await axios.post('http://localhost:5000/api/user/add/blog', {
               title, description, blog_img, categorys
          }, {
               headers: {
                    'auth-token': localStorage.getItem('auth-token')
               }
          }).then((response) => {


               return response.data
          }).catch((error) => {
               console.error(error.response.data)

               return error.response.data
          })
          return response
     }
)

export const UserBlogDelete = createAsyncThunk(
     'user/blog/delete',
     async (id) => {
          const response = await axios.delete(`http://localhost:5000/api/user/delete/blog/${id}
`, {
               headers: {
                    'auth-token': localStorage.getItem('auth-token')
               }
          }).then((response) => {



               return response.data
          }).catch((error) => {
               console.error(error.response.data);

               return error.response.data
          })
          return response
     }
)

export const UserBlogEditGet = createAsyncThunk(
     'user/blog/get/edit',
     async (id) => {
          const response = await axios.post(`http://localhost:5000/api/user/edit/blogeditget/${id}
`, {}, {
               headers: {
                    'auth-token': localStorage.getItem('auth-token')
               }
          }).then((response) => {



               return response.data
          }).catch((error) => {
               console.error(error.response.data);

               return error.response.data
          })
          return response
     }
)
export const UserBlogEdit = createAsyncThunk(
     'user/blog/edit',
     async (blog) => {
          const { title, description, categorys, blog_img, _id } = await blog
          const response = await axios.patch(`http://localhost:5000/api/user/update/blog/${_id}
`, { title, categorys, description, blog_img }, {
               headers: {
                    'auth-token': localStorage.getItem('auth-token')
               }
          }).then((response) => {


               return response.data
          }).catch((error) => {
               console.error(error.response.data);

               return error.response.data
          })
          return response
     }
)

export const CategoryWiseGetData = createAsyncThunk(
     'blog/Category/Wise/GetData',

     async (name) => {

          const response = await axios.get(`http://localhost:5000/api/category/wise/getdata/${name}
`).then((response) => {

               return response.data
          }).catch((error) => {
               console.error(error.response.data);

               return error.response.data
          })
          return response
     }
)

const BlogReducer = createSlice({
     name: 'blog',
     initialState,
     reducers: {
          SearchBlog: (state, payload) => {
               state.searchdata = payload.payload
          }
     },
     extraReducers: (builder) => {
          builder.addCase(AllBlogGet.pending, (state) => {
               state.pending = true
          })
          builder.addCase(AllBlogGet.fulfilled, (state, payload) => {
               state.pending = false
               state.blog = payload.payload
          })
          builder.addCase(AllBlogGet.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          builder.addCase(FullBlogGet.pending, (state) => {
               state.pending = true
          })
          builder.addCase(FullBlogGet.fulfilled, (state, payload) => {
               state.pending = false
               state.fullblog = payload.payload
          })
          builder.addCase(FullBlogGet.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          builder.addCase(OtherUserBlogGet.pending, (state) => {
               state.pending = true
          })
          builder.addCase(OtherUserBlogGet.fulfilled, (state, payload) => {
               state.pending = false
               state.otherblog = payload.payload
          })
          builder.addCase(OtherUserBlogGet.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })


          builder.addCase(UserGetBlogs.pending, (state) => {
               state.pending = true
          })
          builder.addCase(UserGetBlogs.fulfilled, (state, payload) => {
               state.pending = false
               state.blog = payload.payload
          })
          builder.addCase(UserGetBlogs.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          builder.addCase(UserBlogAdd.pending, (state) => {
               state.pending = true
          })
          builder.addCase(UserBlogAdd.fulfilled, (state, payload) => {
               state.pending = false
               state.blogadd = payload.payload
          })
          builder.addCase(UserBlogAdd.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          builder.addCase(UserBlogDelete.pending, (state) => {
               state.pending = true
          })
          builder.addCase(UserBlogDelete.fulfilled, (state, payload) => {
               state.pending = false
               state.blogdelete = payload.payload
          })
          builder.addCase(UserBlogDelete.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          builder.addCase(UserBlogEditGet.pending, (state) => {
               state.pending = true
          })
          builder.addCase(UserBlogEditGet.fulfilled, (state, payload) => {
               state.pending = false
               state.blogget = payload.payload

          })
          builder.addCase(UserBlogEditGet.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })

          //  builder.addCase(UserBlogEdit.pending, (state)=>{
          //      state.pending=true
          // })
          builder.addCase(UserBlogEdit.fulfilled, (state, payload) => {
               state.pending = false
               state.blogedit = payload.payload
          })
          builder.addCase(UserBlogEdit.rejected, (state, payload) => {
               // state.pending=false
               state.error = payload.payload;
          })


          builder.addCase(CategoryWiseGetData.pending, (state) => {
               state.pending = true
          })
          builder.addCase(CategoryWiseGetData.fulfilled, (state, payload) => {
               state.pending = false
               state.catblog = payload.payload
          })
          builder.addCase(CategoryWiseGetData.rejected, (state, payload) => {
               state.pending = false
               state.error = payload.payload;
          })


     }
})

export const { SearchBlog } = BlogReducer.actions

export default BlogReducer.reducer