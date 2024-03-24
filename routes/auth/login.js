import express from 'express';
import User from '../../models/user.js';
const router = express.Router();
import jwt from 'jsonwebtoken'

router.post("/", async (req, res) => {
    try {
        const {email, password} = req.body;
        const isExist = await User.find({ email: email });
        if(isExist.length === 0){
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        else{
            const data = {
                userId: isExist[0]._id,
                username: isExist[0].username,
                email: email,
            }
            const token = jwt.sign(data, process.env.SALT)
            return res.status(200).json({ success: true, message: "Login Successfully", token: token })
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})

export default router;