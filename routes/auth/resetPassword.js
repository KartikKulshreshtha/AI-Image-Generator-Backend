import express from 'express';
const router = express.Router();
import User from '../../models/user.js';
import bcrypt from 'bcrypt'

router.post('/', async(req, res) => {
    try {
        const {email, newPassword} = req.body;
        console.log(email)
        const isExist = await User.find({ email: email });
        if (isExist.length === 0) {
            return res.status(400).json({ success: false, message: "User does not exist" })
        }
        else{
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate({email: email}, {password: hashedPassword});
            return res.status(200).json({ success: true, message: "Password updated successfully" })
        }
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
})

export default router;