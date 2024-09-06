import SubmittedTest from '../../models/SubmittedTests.js';

const getAllSubmittedTests = async (req, res) => {
    try {
        const submittedTests = await SubmittedTest.find()
            .populate('test_id')
            .populate('user_id');
        res.status(200).json(submittedTests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted tests', error });
    }
};

export default getAllSubmittedTests;
