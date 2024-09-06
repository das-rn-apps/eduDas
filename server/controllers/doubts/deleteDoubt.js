import Doubt from '../../models/Doubt.js';

// Soft delete a doubt
const deleteDoubt = async (req, res) => {
    try {
        const { doubtId } = req.params;

        const doubt = await Doubt.findById(doubtId);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        doubt.is_deleted = true;
        await doubt.save();

        res.status(200).json({ message: 'Doubt deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default deleteDoubt;