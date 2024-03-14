import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../models/post.js';

dotenv.config();
const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await Post.find({}).maxTimeMS(30000);
        return res.status(200).json({ success: true, message: posts })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
})
router.post('/upload', async (req, res) => {
    try {
        const { name, description, image } = req.body;
        const photoUrl = await cloudinary.uploader.upload(image);
        console.log(photoUrl);
        const newPost = new Post({
            name,
            description,
            image: photoUrl.url
        });
        newPost.save()
        return res.status(201).json({ success: true, message: newPost }); // Send response once
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' }); // Handle errors
    }
});


export default router;