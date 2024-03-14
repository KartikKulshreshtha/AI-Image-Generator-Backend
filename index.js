import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import ConnectionMongoDb from './database/db.js';
import postRoutes from './routes/postsRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.use(express.json({limit: '50mb'}));

app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);


const startServer = async(req, res) => {
    ConnectionMongoDb(process.env.MONGODB_URL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}
startServer();