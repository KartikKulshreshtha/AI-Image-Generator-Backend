import express from 'express';
import User from '../../models/user.js';
const router = express.Router();
import jwt from 'jsonwebtoken'

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        } else {
            // Compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ success: false, message: "Incorrect password" });
            } else {
                // Passwords match, generate token
                const data = {
                    userId: user._id,
                    username: user.username,
                    email: email,
                }
                const token = jwt.sign(data, process.env.SALT)
                return res.status(200).json({ success: true, message: "Login Successfully", token: token })
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
})

export default router;