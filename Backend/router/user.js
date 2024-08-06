import express from 'express';
import { body } from "express-validator";
import { signup, login, getusers, profile_edit, UserProfileView, Contact, PasswordChange } from '../controller/user.js';
import { Blogs, FullBlog, OtherUserViewBlogs, UserBlogAdd, UserBlogDelete, UserBlogEditGet, UserBlogGet, UserBlogUpdate } from '../controller/blog.js';
import fetchuser from '../controller/fetchuser.js';
import { CategoryAdd, CategoryGet, CategoryWiseGetData } from '../controller/category.js';
import { CommentBlogGet, UserBlogCommentDelete, UserBlogCommentEdit, UserBlogCommentEditGet, UserBlogCommentGet, UserSendComment } from '../controller/comments.js';
const router = express.Router();

// User
router.post('/api/signup', [
   body('username', "UserName must be 3 to 10 Character Use").trim().isLength({ min: 3, max: 15 }),
   body('email', "Email Invalid").isEmail(),
   body('password', "Password must be 6 to 8 Character Use").trim().isLength({ min: 6, max: 8 }),
   body('gender').trim().notEmpty(),
   body('birthdate').trim().notEmpty(),
   body('country').trim().notEmpty()
], signup)

   .post('/api/login', [
      body('username', "UserName must be 3 to 10 Character Use").trim().isLength({ min: 3, max: 15 }),
      body('password', "Password must be 6 to 8 Character Use").trim().isLength({ min: 6, max: 8 }),
   ], login)

   .post('/api/getuser', fetchuser, getusers)

   .patch('/api/user/profile_edit', [
      body('username', "UserName must be 3 to 10 Character Use").trim().isLength({ min: 3, max: 15 }),
      body('email', "Email Invalid").isEmail(),
      body('password', "Password must be 6 to 8 Character Use").trim().isLength({ min: 6, max: 8 }),
      body('gender').trim().notEmpty(),
      body('birthdate').trim().notEmpty(),
      body('country').trim().notEmpty()
   ], fetchuser, profile_edit)

   .patch('/api/user/password/chnage', [
      body('password', "Password must be 6 to 8 Character Use").trim().isLength({ min: 6, max: 8 }),
   ], fetchuser, PasswordChange)
   .post('/api/user/profile/view/:id', UserProfileView)

   .post('/api/user/feeback', [
      body('feedback').trim().isLength({ min: 10 }).notEmpty()
   ], fetchuser, Contact)

   // blogs

   .get('/api/all/blogs', Blogs)

   .post('/api/get/blog/:id', FullBlog)

   .post('/api/other/user/get/blog/:id', OtherUserViewBlogs)

   .post('/api/user/getblogs', fetchuser, UserBlogGet)

   .post('/api/user/edit/blogeditget/:id', fetchuser, UserBlogEditGet)

   .post('/api/user/add/blog', [
      body('title', "title must be 3 to 10 Character Use").trim().isLength({ min: 3, max: 20 }),
      body('description', "").trim().isLength({ min: 10 }),
      body('blog_img').trim().notEmpty(),
      body('categorys').trim().notEmpty()
   ], fetchuser, UserBlogAdd)

   .patch('/api/user/update/blog/:id', [
      body('title', "title must be 3 to 10 Character Use").trim().isLength({ min: 3, max: 20 }),
      body('description', "").trim().isLength({ min: 10 }),
      body('blog_img').trim().notEmpty(),
      body('categorys').trim().notEmpty()
   ], fetchuser, UserBlogUpdate)

   .delete('/api/user/delete/blog/:id', fetchuser, UserBlogDelete)

   // categorys

   .get('/api/all/categorys', CategoryGet)

   .get('/api/category/wise/getdata/:name', CategoryWiseGetData)

   .post('/api/add/categorys', CategoryAdd)

   // comments

   .get('/api/blog/comments/:id', CommentBlogGet)

   .post('/api/blog/user/comments/get', fetchuser, UserBlogCommentGet)

   .post('/api/blog/user/comments/:id', [
      body('comment').trim().isLength({ min: 4 })
   ], fetchuser, UserSendComment)

   .post('/api/blog/user/comments/edit/get/:id', fetchuser, UserBlogCommentEditGet)

   .patch('/api/blog/user/comments/edit/:id', [
      body('comment').trim().isLength({ min: 4 })
   ], fetchuser, UserBlogCommentEdit)


   .delete('/api/blog/user/comments/delete/:id', fetchuser, UserBlogCommentDelete)

export default router;