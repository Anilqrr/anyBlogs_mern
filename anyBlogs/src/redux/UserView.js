import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  userview: {},
}

export const UserProfileView = createAsyncThunk(
  'user/profile/view',
  async (id) => {

    const response = await axios.post(`http://localhost:5000/api/user/profile/view/${id}`)
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

const UserViewReducer = createSlice({
  name: 'userview',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(UserProfileView.pending, (state) => {
      state.pending = true;
    })
    builder.addCase(UserProfileView.fulfilled, (state, payload) => {
      state.pending = false;
      state.userview = payload.payload
    })
    builder.addCase(UserProfileView.rejected, (state, payload) => {
      state.pending = false;
      state.error = payload.payload
    })
  }
})

export default UserViewReducer.reducer