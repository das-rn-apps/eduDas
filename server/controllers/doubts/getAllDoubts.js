import Doubt from '../../models/Doubt.js';

const getAllDoubts = async (req, res) => {
    try {
        const doubts = await Doubt.find()
            .populate({
                path: 'chats.sender_id',
                select: 'firstName lastName'
            });
        res.status(200).json(doubts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getAllDoubts;
