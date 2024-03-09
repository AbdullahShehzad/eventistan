const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const firebaseAdmin = require('../config/firebaseAdmin');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Create user in Firebase Authentication
        const userRecord = await firebaseAdmin.auth().createUser({
            email,
            password,
        });

        // Create user in MongoDB
        const user = new User({
            firebaseUid: userRecord.uid,
            email,
        });

        await user.save();

        // Generate JWT
        const payload = {
            user: {
                id: user.firebaseUid,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify user with Firebase
        const user = await firebaseAdmin.auth().getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist.' });
        }

        // Verify the password - assuming you're storing a hashed password in MongoDB for additional checks or user data retrieval
        const isMatch = await bcrypt.compare(password, userRecord.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials.' });
        }

        // Generate JWT Token
        const payload = { userId: user.uid };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during login.');
    }
};
