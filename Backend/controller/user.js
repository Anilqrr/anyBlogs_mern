import Dotenv from 'dotenv';
import { User } from "../model/User.js"
import { Blog } from '../model/Blog.js';
import { Comment } from '../model/Comment.js';
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { validationResult } from "express-validator";
import { ContactUser } from '../model/Contact.js';
Dotenv.config();
const jwt = process.env.JWT_SECRET;

export const signup = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: "validation error", success: false, });
    }
    try {
        const { username, email, password, gender, birthdate, country } = req.body;
        const ExistsUser = await User.findOne({ $or: [{ username: username }, { email: email }] }).exec();

        if (ExistsUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User({
            username: username,
            email: email,
            password: hashedPassword,
            gender: gender,
            birthdate: birthdate,
            country: country
        });



        await user.save().catch(() => {
            res.status(404).json({
                success: false,
                message: 'Server error'
            })
        })

        const data = await {
            user: {
                id: user._id
            }
        }

        const authtoken = await JWT.sign(data, jwt);

        res.status(200).json({ success: true, authtoken });

    } catch (error) {
        res.status(400).send({ success: false, error })
    }

}

export const login = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username: username }).exec();

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User Not Found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password'
            })
        }

        const data = {
            user: {
                id: user._id
            }
        }

        const authtoken = JWT.sign(data, jwt);

        res.status(200).json({ success: true, authtoken });

    } catch (error) {
        res.status(400).send({ success: false, error })
    }
}

export const getusers = async (req, res) => {

    try {
        const userid = await req.user.id;
        const user = await User.findOne({ _id: userid }).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(404).json({ success: false, error });
    }

}

export const profile_edit = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const { username, email, password, gender, birthdate,
            country, bio, profile_img, bg_img
        } = await req.body;
        const userid = await req.user.id;
        let user = await User.findOne({ _id: userid })

        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, msg: 'Invalid Password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.findByIdAndUpdate({ _id: userid },
            {
                username: username,
                email: email,
                password: hashedPassword,
                gender: gender,
                birthdate: birthdate,
                country: country,
                bio: bio,
                profile_img: profile_img,
                bg_img: bg_img
            }
            , { new: true }
        )

        const blog = await Blog.updateMany({ author: userid }, { username: username, profile_img: profile_img }, { new: true })

        const comment = await Comment.updateMany({ user_id: userid }, { username: username, profile_img: profile_img }, { new: true })

        res.json({ success: true, user, blog, comment });
    } catch (error) {
        res.status(401).json({ success: false, error: "User not found" });
    }
};

export const PasswordChange = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }
    try {
        const { password } = req.body;
        const userid = await req.user.id;
        let user = await User.findOne({ _id: userid }).select('password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        user = await User.findByIdAndUpdate({ _id: userid }, { password: hashedPassword }, { new: true })
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

export const UserProfileView = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({ _id: id }).select('-password');

        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' })
        }
        res.status(200).send({ success: true, user })
    } catch (error) {
        res.status(400).send({ success: false, message: error.message })
    }
}

export const Contact = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const userid = await req.user.id;
        const user = await User.findOne({ _id: userid }).select('username')

        if (!user || user.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const contatc = await ContactUser({
            username: user.username,
            feedback: req.body.feedback
        })
        contatc.save().catch((error) => {
            res.status(400).send({
                success: false,
                message: error.message
            })
        })
        res.status(200).send({ success: true, contatc })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}
