import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    roomAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Room = mongoose.model("room", roomSchema);

export default Room;