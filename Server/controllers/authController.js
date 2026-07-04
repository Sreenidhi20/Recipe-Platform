const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
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
            bio: user.bio,
            profileCompleted: user.profileCompleted
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

// Complete user profile (after registration)
router.post('/complete-profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
        const { bio, age, dateOfBirth, phone, location, facebook, instagram, twitter, linkedin } = req.body;
        const userId = req.user.userId;

        let updateData = {
            bio: bio || '',
            age: age ? parseInt(age) : null,
            dateOfBirth: dateOfBirth || null,
            phone: phone || '',
            location: location || '',
            profileCompleted: true,
            socialMediaLinks: {
                facebook: facebook || '',
                instagram: instagram || '',
                twitter: twitter || '',
                linkedin: linkedin || ''
            }
        };

        // If file is uploaded, add profile picture
        if (req.file) {
            updateData.profilePicture = req.file.path;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        
        res.json({ 
            success: true, 
            message: 'Profile completed successfully', 
            user 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update user profile
router.put('/update-profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
        const { bio, age, dateOfBirth, phone, location, facebook, instagram, twitter, linkedin } = req.body;
        const userId = req.user.userId;

        let updateData = {};

        if (bio) updateData.bio = bio;
        if (age) updateData.age = parseInt(age);
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
        if (phone) updateData.phone = phone;
        if (location) updateData.location = location;

        if (facebook || instagram || twitter || linkedin) {
            updateData.socialMediaLinks = {
                facebook: facebook || '',
                instagram: instagram || '',
                twitter: twitter || '',
                linkedin: linkedin || ''
            };
        }

        if (req.file) {
            updateData.profilePicture = req.file.path;
        }

        const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
        
        res.json({ 
            success: true, 
            message: 'Profile updated successfully', 
            user 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;