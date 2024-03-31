import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
})


const Admin = mongoose.model("admin", adminSchema);

export default Admin;