const express = require("express");
const User = require("../modules/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.post("/usercreate", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const savedUser = await User.create({ username, email, password: hashPassword });

        const auth_token = jwt.sign({ username, email }, process.env.JWTKEY, { expiresIn: '1h' });

        res.cookie('auth&token', auth_token);
        res.redirect("/dashboard");
    } catch (error) {
        res.status(500).send('An error occurred while creating the user. Please try again later. ');
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Both email and password are required');
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        // Create a JWT token
        const auth_token = jwt.sign({ username: user.username, email: user.email }, process.env.JWTKEY, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('auth&token', auth_token);
        res.redirect("/dashboard");
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('An error occurred while logging in. Please try again later.');
    }
});

router.post("/logout", (req, res) => {
    try {
        res.clearCookie('auth&token');
        res.redirect("/login");
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).send('An error occurred while logging out. Please try again later.');
    }
});

module.exports = router;
