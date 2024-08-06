import { Category } from "../model/Category.js";
import { Blog } from "../model/Blog.js";
export const CategoryGet = async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json({ success: true, category })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }
     

}

export const CategoryAdd = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(200).json({ success: true, category })
    } catch (error) {
        res.status(404).send({ success: false, error })
    }
}

export const CategoryWiseGetData = async (req, res) =>{
       try {
        const {name} = await req.params
        const blog = await Blog.find({categorys:name})
        if(!blog || blog.length === 0){
            return res.status(404).send({success:false, message:"Category Data Not Found"})
        }
        res.status(200).send({success:true, blog})
       } catch (error) {
          res.status(404).send({success:false, messag: error})
       }
}