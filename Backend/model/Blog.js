import mongoose from "mongoose";
const { Schema } = mongoose;


const BlogSchema = new Schema({
      author:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
      username:{type:String, ref:"users"},
      profile_img:{type:String, ref:"users"},
      title:{type:String, require:true},
      description:{type:String, require:true},
      blog_img:{type:String, require:true},
      categorys:{type:String, require:true},
      date:{type:Date, default:Date.now}
})

export const Blog = mongoose.model("blogs", BlogSchema);