import SubmittedTest from '../../models/SubmittedTests.js';

const getSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const submittedTest = await SubmittedTest.findById(id).populate('test_id').populate('user_id');

        if (!submittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json(submittedTest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching submitted test', error });
    }
};

export default getSubmittedTestById;
