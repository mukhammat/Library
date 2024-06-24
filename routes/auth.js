// routes/auth.js
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../middleware/validate');
const bcrypt = require('bcryptjs');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'test';

router.post('/users/register', validateRegister, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Checking if a user with the same name exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ username, password });
        await user.save();

        // Generate token
        const token = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', validateLogin, async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверка, существует ли пользователь с таким именем
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Генерация JWT токена
        const token = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
