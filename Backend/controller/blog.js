
import { Blog } from '../model/Blog.js'
import { User } from '../model/User.js';
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { validationResult } from "express-validator";


export const Blogs = async (req, res) => {
    try {
        const blog = await Blog.find().sort({ date: -1 })
        res.send({ success: true, blog })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }

}

export const FullBlog = async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.findOne({ _id: id })
        if (!blog || blog.length === 0) {
            return res.status(404).send({ success: false, message: "No blog found" })
        }
        res.send({ success: true, blog })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }

}

export const OtherUserViewBlogs = async (req, res) => {
    try {
        const id = await req.params.id;
        const blog = await Blog.find({ author: id }).sort({ date: -1 })
        if (!blog || blog.length === 0) {
            return res.status(404).send({ success: false, message: 'No blog found' });
        }
        res.status(200).send({ success: true, blog })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}

export const UserBlogGet = async (req, res) => {
    try {
        const userid = await req.user.id;

        const blog = await Blog.find({ author: userid }).sort({ date: -1 })

        if (!blog) {
            res.status(404).send({ success: false, error: "User not found" })
        }

        res.status(200).json({ success: true, blog })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }
}

export const UserBlogEditGet = async (req, res) => {
    try {
        const id = await req.params.id
        const userid = await req.user.id;

        let blog = await Blog.findOne({ $and: [{ _id: id }] });

        if (!blog) {
            return res.status(404).send({ success: false, error: "User not found" })
        }
        res.send({ success: true, blog })
    } catch (error) {
        res.status(404).send({ success: false, error: error })
    }
}

export const UserBlogAdd = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const { title, description, blog_img, categorys } = req.body;
        const userid = await req.user.id;
        const user = await User.findOne({ _id: userid }).select(['username', 'profile_img'])

        const blog = await Blog({
            author: userid,
            username: user.username,
            profile_img: user.profile_img,
            title: title,
            description: description,
            blog_img: blog_img,
            categorys: categorys
        })

        blog.save().catch((err) => {
            res.status(404).json({
                success: false,
                message: 'Server error'
            })
        })

        res.status(200).json({ success: true, blog })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }
}

export const UserBlogUpdate = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const id = req.params.id
        const { title, description, categorys, blog_img } = req.body
        const userid = await req.user.id;

        let blog = await Blog.findOne({ author: userid, _id: id });

        if (!blog) {
            return res.status(404).send({ success: false, error: "User not found" })
        }
        blog = await Blog.findByIdAndUpdate({ author: userid, _id: id }, {
            title, description, categorys, blog_img
        }, { new: true })
        res.send({ success: true, blog })
        // blog = await Blog.
    } catch (error) {
        res.status(404).send({ success: false, error: error })
    }
}

export const UserBlogDelete = async (req, res) => {

    try {
        const id = await req.params.id
        const userid = await req.user.id;

        let blog = await Blog.findOne({ author: userid, _id: id });

        if (!blog) {
            return res.status(401).send({ success: false, error: "User not found" })
        }
        blog = await Blog.findByIdAndDelete({ author: userid, _id: id }, { new: true })
        res.send({ success: true, blog })
        // blog = await Blog.
    } catch (error) {
        res.status(404).send({ success: false, error: error })
    }
}