import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    comment: {},
}

export const BlogCommentGets = createAsyncThunk(
    'blog/comment/get',
    async (bid) => {
        const { id } = bid;
        const response = await axios.get(`https://any-blogs-server.vercel.app/api/blog/comments/${id}`).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)
export const UserBlogCommentSend = createAsyncThunk(
    'user/blog/comment/send',
    async (comments) => {
        const { id, comment } = comments;

        const response = await axios.post(`https://any-blogs-server.vercel.app/api/blog/user/comments/${id}`, {
            comment
        }, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)

export const UserBlogsCommentedGets = createAsyncThunk(
    'user/blogs/commented',
    async () => {


        const response = await axios.post(`https://any-blogs-server.vercel.app/api/blog/user/comments/get`, {}, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)


export const UserBlogCommentEditGet = createAsyncThunk(
    'user/blog/comment/edit/get',
    async (id) => {


        const response = await axios.post(`https://any-blogs-server.vercel.app/api/blog/user/comments/edit/get/${id}`, {}, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)
export const UserBlogCommentEdit = createAsyncThunk(
    'user/blog/comment/edit',
    async (comments) => {
        const { comment, _id } = comments;

        const response = await axios.patch(`https://any-blogs-server.vercel.app/api/blog/user/comments/edit/${_id}`, { comment }, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)
export const UserBlogCommentDelete = createAsyncThunk(
    'user/blog/comment/delete',
    async (id) => {
        const _id = id;
        const response = await axios.delete(`https://any-blogs-server.vercel.app/api/blog/user/comments/delete/${_id}`, {
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        }).then((response) => {


            return response.data
        })
            .catch((error) => {
                console.error(error.response.data)

                return error.response.data
            });

        return response
    }
)

const CommentReducer = createSlice({
    name: 'comment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(BlogCommentGets.pending, (state) => {
            state.pending = true
        })
        builder.addCase(BlogCommentGets.fulfilled, (state, payload) => {
            state.pending = false
            state.comment = payload.payload
        })
        builder.addCase(BlogCommentGets.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })
        builder.addCase(UserBlogCommentSend.pending, (state) => {
            state.commentsend = { pending: true }
        })
        builder.addCase(UserBlogCommentSend.fulfilled, (state, payload) => {
            //    state.pending = false
            state.commentsend = { pending: false, payload: payload.payload }
        })
        builder.addCase(UserBlogCommentSend.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })
        builder.addCase(UserBlogsCommentedGets.pending, (state) => {
            state.pending = true
        })
        builder.addCase(UserBlogsCommentedGets.fulfilled, (state, payload) => {
            state.pending = false
            state.usercomments = payload.payload
        })
        builder.addCase(UserBlogsCommentedGets.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })

        builder.addCase(UserBlogCommentEditGet.pending, (state) => {
            state.pending = true
        })
        builder.addCase(UserBlogCommentEditGet.fulfilled, (state, payload) => {
            state.pending = false
            state.commenteditget = payload.payload
        })
        builder.addCase(UserBlogCommentEditGet.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })

        //  builder.addCase(UserBlogCommentEdit.pending, (state)=>{
        //        state.pending = true
        //  })
        builder.addCase(UserBlogCommentEdit.fulfilled, (state, payload) => {
            state.pending = false
            state.commentedit = payload.payload
        })
        builder.addCase(UserBlogCommentEdit.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })

        builder.addCase(UserBlogCommentDelete.pending, (state) => {
            state.pending = true
        })
        builder.addCase(UserBlogCommentDelete.fulfilled, (state, payload) => {
            state.pending = false
            state.commentdelete = payload.payload
        })
        builder.addCase(UserBlogCommentDelete.rejected, (state, payload) => {
            state.pending = false
            state.error = payload.payload
        })
    }
}
)

export default CommentReducer.reducer
