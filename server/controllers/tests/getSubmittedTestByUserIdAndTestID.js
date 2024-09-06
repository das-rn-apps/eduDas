import SubmittedTest from '../../models/SubmittedTests.js';

const getSubmittedTestByUserIdAndTestID = async (req, res) => {
    try {
        const { user_id, test_id } = req.params;

        // Find the submitted test by user_id and test_id
        const submittedTest = await SubmittedTest.findOne({ user_id, test_id })
            .populate('test_id')
            .populate('user_id');

        if (!submittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }
        res.status(200).json(submittedTest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted test', error: error.message });
    }
};

export default getSubmittedTestByUserIdAndTestID;
