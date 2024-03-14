import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';

dotenv.config();
const router = express.Router();

const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
});
router.get('/', async (req, res) => {
    res.send("OK");
});
router.post('/prompt', async (req, res) => {
    try {
        const { description } = req.body;
        const aiResponse = await openai.images.generate({
            model: "dall-e-2",
            prompt: description,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        });
        // console.log(aiResponse.data)
        const image = aiResponse.data[0].b64_json;
        res.status(200).json({success: true, photo: image }); // Send response to client
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false,  error: 'Internal Server Error' }); // Handle errors
    }
});

export default router;