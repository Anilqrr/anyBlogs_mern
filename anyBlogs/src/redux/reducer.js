import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { retry } from '@reduxjs/toolkit/query'
import axios from 'axios'


const initialState = {
  user: {},
}

export const SignupUser = createAsyncThunk(
  'user/signup',
  async (user) => {
    const { username, email, password, gender, birthdate, country } = await user
    const response = await axios.post('http://localhost:5000/api/signup', { username, email, password, gender, birthdate, country })
      .then((response) => {

        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        return err.response.data
      })

    return response
  })

export const LoginUser = createAsyncThunk(
  'user/login',
  async (user) => {
    const { username, password } = await user
    const response = await axios.post('http://localhost:5000/api/login', { username, password })
      .then((response) => {

        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        return err.response.data
      })

    return response
  }
)

export const UserProfile = createAsyncThunk(
  'user/profile',
  async () => {

    const response = await axios.post('http://localhost:5000/api/getuser', {}, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    })
      .then((response) => {

        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        return err.response.data
      })
    return response
  })
export const UserProfileEdit = createAsyncThunk(
  'user/profile/edit',
  async (user) => {
    const { username, email, password, gender, birthdate, country, bio, bg_img, profile_img } = await user

    const response = await axios.patch('http://localhost:5000/api/user/profile_edit', {
      username, email, password, gender, birthdate, country, bio, bg_img, profile_img
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    })
      .then((response) => {


        // return {response:response.data, s:true}
        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        // return {err:err.response.data,s:false}
        return err.response.data
      })
    return response
  })

export const UserPasswordChange = createAsyncThunk(
  '/user/password/change',
  async (passwordchnage) => {
    const { password } = await passwordchnage

    const response = await axios.patch('http://localhost:5000/api/user/password/chnage', {
      password
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    })
      .then((response) => {


        // return {response:response.data, s:true}
        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        // return {err:err.response.data,s:false}
        return err.response.data
      })
    return response
  }
)

export const ContactFeedback = createAsyncThunk(
  'user/contact-feedback',
  async (contatc) => {
    const { feedback } = await contatc

    const response = await axios.post('http://localhost:5000/api/user/feeback', {
      feedback
    }, {
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    })
      .then((response) => {


        // return {response:response.data, s:true}
        return response.data
      })
      .catch(err => {
        console.error(err.response.data)
        // return {err:err.response.data,s:false}
        return err.response.data
      })
    return response

  }
)

export const UserReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(SignupUser.pending, (state, payload) => {
      state.pending = true

    })
    builder.addCase(SignupUser.fulfilled, (state, payload) => {
      state.pending = false
      state.user = payload

    })
    builder.addCase(SignupUser.rejected, (state, payload = false) => {
      state.user = payload
    })

    builder.addCase(LoginUser.pending, (state, payload) => {
      state.pending = true
    })
    builder.addCase(LoginUser.fulfilled, (state, payload) => {
      state.pending = false
      state.user = payload
    })
    builder.addCase(LoginUser.rejected, (state, payload = false) => {
      state.user = payload
    })

    builder.addCase(UserProfile.pending, (state) => {
      state.pending = true
      // state.edit={success:false}
    })
    builder.addCase(UserProfile.fulfilled, (state, payload) => {
      state.pending = false
      state.user = payload.payload

      // state.edit={success:false}
    })
    builder.addCase(UserProfile.rejected, (state, payload = false) => {
      state.error = payload
      // state.edit={success:false}
    })
    // builder.addCase(UserProfileEdit.pending, (state) => {
    //   state.pending=true
    // })
    builder.addCase(UserProfileEdit.fulfilled, (state, payload) => {
      state.pending = false
      state.edit = payload.payload
    })
    builder.addCase(UserProfileEdit.rejected, (state, payload) => {
      state.error = payload.error
    })


    // builder.addCase(UserPasswordChange.pending, (state) => {
    //   state.pending = true
    // })
    builder.addCase(UserPasswordChange.fulfilled, (state, payload) => {
      state.pending = false
      state.password_c = payload.payload
    })
    builder.addCase(UserPasswordChange.rejected, (state, payload) => {
      state.error = payload.error
    })



    builder.addCase(ContactFeedback.pending, (state) => {
      state.pending = true
    })
    builder.addCase(ContactFeedback.fulfilled, (state, payload) => {
      state.pending = false
      state.feedback = payload.payload
    })
    builder.addCase(ContactFeedback.rejected, (state, payload) => {
      state.pending = false
      state.error = payload.error
    })
  },


})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default UserReducer.reducer