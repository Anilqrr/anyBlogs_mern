import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
    blog_title: { type: String, ref: "blogs", required: true },
    username: { type: String, ref: "users", required: true },
    profile_img: { type: String, ref: "users" },
    comment: { type: String, require: true, required: true },
    date: { type: Date, default: new Date }
})

export const Comment = mongoose.model("comments", CommentSchema);