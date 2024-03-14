import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }   
})

const Post = mongoose.model("Post", PostSchema);
export default Post;