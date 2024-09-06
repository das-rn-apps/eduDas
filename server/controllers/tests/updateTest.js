import Test from '../../models/Test.js';

const updateTest = async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTest || updatedTest.is_deleted) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json(updatedTest);
    } catch (error) {
        // console.error('Error updating test:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default updateTest;
