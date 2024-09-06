import Doubt from '../../models/Doubt.js';

const addChat = async (req, res) => {
    try {
        const { doubtId } = req.params;

        const doubt = await Doubt.findById(doubtId);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        doubt.chats.push(req.body);
        await doubt.save();

        res.status(200).json(doubt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default addChat;
