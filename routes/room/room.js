import express from 'express';
const router = express.Router();
import createRoom from './createRoom.js';
import getRoom from './getRoom.js';

router.use('/createRoom', createRoom);
router.use('/getRoom', getRoom);

export default router;