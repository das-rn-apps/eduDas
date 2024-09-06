import SubmittedTest from '../../models/SubmittedTests.js';
import mongoose from 'mongoose';

const getSubmittedTestByUserId = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the provided ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Fetch submitted tests for the given user ID
        const submittedTests = await SubmittedTest.find({ user_id: id, is_deleted: false })
            .populate('test_id')
            .sort({ createdAt: -1 });

        if (!submittedTests || submittedTests.length === 0) {
            return res.status(404).json({ message: 'No submitted tests found for this user' });
        }

        // Return the fetched data
        res.status(200).json(submittedTests);
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({ message: 'Error fetching submitted tests', error: error.message });
    }
};

export default getSubmittedTestByUserId;
