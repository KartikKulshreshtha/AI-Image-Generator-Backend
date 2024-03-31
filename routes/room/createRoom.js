import express from 'express';
const router = express.Router();
import Room from '../../models/room.js';
import Admin from '../../models/roomAdmin.js';
import User from '../../models/user.js';

router.post('/', async (req, res) => {
    try {
        const { roomName, email } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const roomId = generateRandomId();

        const room = new Room({
            roomName: roomName,
            roomId: roomId,
            roomAdmin: user._id,
            users: [user._id]
        });

        await room.save();

        const admin = new Admin({
            email: email,
            roomId: room._id
        });
        await admin.save();

        return res.status(201).json({ success: true, message: "Room created successfully" });
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});
function generateRandomId() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;
