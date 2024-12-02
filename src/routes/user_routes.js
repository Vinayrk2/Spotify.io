const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup/', async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'User with this email or username already exists' 
            });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();

        res.status(201).render("login", {"message":"Account Created Successfully"})

    } catch (error) {
        res.status(500).json({ 
            error: error.message || 'Error creating user' 
        });
    }
});

// Login route
router.post('/login/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.redirect("/");

    } catch (error) {
        res.status(500).json({ 
            error: error.message || 'Error during login' 
        });
    }
});

router.get('/login/',(req,res)=>{
    res.render("login")
})
router.get('/signup/',(req,res)=>{
    res.render("signup")
})

module.exports = router; 