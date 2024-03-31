import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import ConnectionMongoDb from './database/db.js';
import postRoutes from './routes/postsRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import authHandler from './routes/auth/auth.js'
import roomHandler from './routes/room/room.js';
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use('/api/post', postRoutes);
app.use('/api/dalle', dalleRoutes);
app.use('/api/auth', authHandler);
app.use('/api/room', roomHandler)

const startServer = async (req, res) => {
    ConnectionMongoDb(process.env.MONGODB_URL)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}
startServer();