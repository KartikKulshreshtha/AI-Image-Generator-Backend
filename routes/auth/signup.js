import express from 'express';
const router = express.Router();
import User from '../../models/user.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

router.post("/", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const isExist = await User.find({ email: email });
        if (isExist.length > 0) {
            return res.status(400).json({ success: false, error: "User already exist" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username: username,
                email: email,
                password: hashedPassword
            }).then((response) => {
                const data = {
                    userId: response._id,
                    username: username,
                    email: email,
                }
                const token = jwt.sign(data, process.env.SALT)
                res.status(200).json({ success: true, message: "Signup Successfully", token: token })
            })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

export default router;