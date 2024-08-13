import { configureStore } from "@reduxjs/toolkit"; 

import userReducer from "./reducer";
import useReducerBlog from "./blog";
import userReducerComment from "./comment";
import userReduceruserProfile from "./UserView"
const store = configureStore({
  reducer: {
    user: userReducer,
    blog: useReducerBlog,
    comments: userReducerComment,
    userview:userReduceruserProfile
  },
});

export default store;