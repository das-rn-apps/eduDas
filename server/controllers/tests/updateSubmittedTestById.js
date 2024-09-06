import SubmittedTest from '../../models/SubmittedTests.js';

const updateSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSubmittedTest = await SubmittedTest.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedSubmittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json({ message: 'Submitted test updated successfully', data: updatedSubmittedTest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating submitted test', error: error.message });
    }
};

export default updateSubmittedTestById;
