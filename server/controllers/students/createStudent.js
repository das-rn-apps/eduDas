import User from '../../models/User.js';
import bcrypt from 'bcryptjs';


const createStudent = async (req, res) => {
    const { firstName, lastName, email, password, dateOfBirth, type } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            password1: password,
            dateOfBirth,
            type
        });

        await user.save();

        res.status(201).json({ message: 'user registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default createStudent;
