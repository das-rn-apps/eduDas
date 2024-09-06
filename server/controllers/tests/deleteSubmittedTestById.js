import SubmittedTest from '../../models/SubmittedTests.js';

const deleteSubmittedTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubmittedTest = await SubmittedTest.findByIdAndDelete(id);

        if (!deletedSubmittedTest) {
            return res.status(404).json({ message: 'Submitted test not found' });
        }

        res.status(200).json({ message: 'Submitted test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting submitted test', error });
    }
};

export default deleteSubmittedTestById;
