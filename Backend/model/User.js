import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  username:{type: String, required: true,index: { unique: true, dropDups: true }},
  email:{type: String, required: true,index: { unique: true, dropDups: true }},
  password:{type: String, required: true},
  gender:{type: String, required: true},
  birthdate:{type: String, required: true},
  country:{type: String, required: true},
  bio:{type: String},
  profile_img:{type: String},
  bg_img:{type: String},
  date:{type:Date, default: new Date}
  // date:{type:Date, default: new Date}
});

export const User = mongoose.model("users", UserSchema);