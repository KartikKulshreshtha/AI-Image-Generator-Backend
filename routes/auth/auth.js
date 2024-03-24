import express from 'express';
const router = express.Router();
import loginHandler from './login.js'
import signupHandler from './signup.js'
import forgotHandler from './forgot.js'
import resetHandler from './resetPassword.js';

router.use('/login', loginHandler)
router.use('/signup', signupHandler)
router.use('/forgot', forgotHandler)
router.use('/reset', resetHandler);

export default router;