const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const jwtSecret = process.env.JWT_SECRET;

// Register a new user
router.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }
    try{
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ success, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ username, email, password: hashedPassword });
        await user.save();
        const payload = { userId : user._id};
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
        success = true;
        res.json({ success:true, message: 'User registered successfully', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Login User

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').exists().withMessage('Password is required')
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success, errors: errors.array() });
    }
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ success, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ success, message: 'Invalid credentials' });
        }
        const payload = { userId : user._id };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
        success = true;
        res.json({ success, token , user:{
            id: user.id,
            username: user.username,
            email: user.email, 
            profilePicture: user.profilePicture,
            bio: user.bio
        }});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Get user profile
router.get('/profile', authMiddleware, async (req,res)=>{
    try{
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;