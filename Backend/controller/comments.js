import { Blog } from '../model/Blog.js'
import { User } from '../model/User.js';
import { Comment } from '../model/Comment.js'

import { validationResult } from "express-validator";


export const CommentBlogGet = async (req, res) => {
    try {
        const id = req.params.id

        const comments = await Comment.find({ blog_id: id }).sort({ date: -1 })
        if (!comments || comments.length === 0) {
            return res.status(404).send({ success: false, message: 'No comments found' })
        }
        res.status(200).send({ success: true, comments })
    } catch (error) {
        res.status(404).send({ success: false, message: error.message })
    }
}

export const UserBlogCommentGet = async (req, res) => {
    try {
        const userid = await req.user.id;

        const comment = await Comment.find({ user_id: userid }).sort({ date: -1 })
        if (!comment || comment.length === 0) {
            return res.status(404).send({ success: false, message: "User Comments not found" })
        }
        res.status(200).send({ success: true, comment })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}


export const UserSendComment = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const userid = await req.user.id;
        const id = await req.params.id
        const blog = await Blog.findOne({ _id: id }).select('title');
        const user = await User.findOne({ _id: userid }).select(["username", "profile_img"]);
        if (!blog && !user) {
            res.status(404).send({ success: false, message: 'No blog found' })
        }



        const comment = await Comment({
            user_id: userid,
            blog_id: req.params.id,
            blog_title: blog.title,
            username: user.username,
            profile_img: user.profile_img,
            comment: req.body.comment,

        })

        await comment.save().catch((err) => {
            res.status(400).send({ success: false, message: err.message })
        })
        res.status(200).send({ success: true, comment })
    } catch (error) {
        res.status(500).send({ success: false, error: error.message })
    }
}

export const UserBlogCommentEditGet = async (req, res) => {
    try {
        const id = await req.params.id;
        const userid = await req.user.id;

        let comment = await Comment.findOne({ $and: [{ _id: id, user_id: userid }] }).select('comment');

        if (!comment || comment.length === 0) {
            res.status(404).json({ success: false, message: 'User Comment not found' })
        }
        res.status(200).json({ success: true, comment })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const UserBlogCommentEdit = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const id = await req.params.id;
        const userid = await req.user.id;

        let comment = await Comment.findOne({ $and: [{ _id: id, user_id: userid }] })

        if (!comment || comment.length === 0) {
            return res.status(404).json({ success: false, message: 'User Comment not found' })
        }

        comment = await Comment.findByIdAndUpdate({ _id: id, user_id: userid }, { comment: req.body.comment }, { new: true })

        res.status(200).json({ success: true, comment })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

export const UserBlogCommentDelete = async (req, res) => {
    try {

        const id = await req.params.id;
        const userid = await req.user.id;

        let comment = await Comment.findOne({ $and: [{ _id: id, user_id: userid }] })

        if (!comment || comment.length === 0) {
            return res.status(404).send({ success: false, message: 'User Comment not found' });
        }

        comment = await Comment.findByIdAndDelete({ _id: id, user_id: userid }, { new: true })

        res.status(200).send({ success: true, comment })

    } catch (error) {
        res.status(400).send({ success: false, message: error.message });
    }
}