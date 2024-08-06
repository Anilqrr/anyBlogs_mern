import Dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router/user.js'
Dotenv.config();
const server = express();
const port = process.env.PORT || 3000;

server.use(cors({
  origin:['https://any-blogs-server.vercel.app'],
  methods:['GET','POST','PUT','PATCH', 'DELETE'],
  credentials:true
}));
server.use(express.json({ limit: '100mb' }));
server.get('/', (req, res) => {
  res.send("Hello")
})
server.use('/', router)

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1/anyBlogs')
  await mongoose.connect(`mongodb+srv://${process.env._USERNAME}:${process.env._PASSWORD}@anyblogs.csulilu.mongodb.net/anyBlogs`)

  console.log('Connection established')
}

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
