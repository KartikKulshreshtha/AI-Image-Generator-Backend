import mongoose from "mongoose";
const ConnectionMongoDb = (URL) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(URL).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => console.log("Error connecting", err));
}

export default ConnectionMongoDb;