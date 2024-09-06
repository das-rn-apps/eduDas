import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginStudent = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user.lastLogin = Date.now();
        await user.save();

        // Generate a token
        const token = jwt.sign(
            {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                lastName: user.lastName,
                type: user.type,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send success response with token
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        // console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export default loginStudent;
