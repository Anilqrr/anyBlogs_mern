import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name:{type:String, required:true},
    date:{type:Date, default:Date.now}
});

export const Category = mongoose.model('Categorys',CategorySchema);