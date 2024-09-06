import Doubt from '../../models/Doubt.js';
// Get a single doubt by ID
const getDoubtById = async (req, res) => {
    try {
        const { doubtId } = req.params;
        const doubt = await Doubt.findById(doubtId)
            .populate('chats.sender_id', 'firstName lastName');

        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        res.status(200).json(doubt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getDoubtById;