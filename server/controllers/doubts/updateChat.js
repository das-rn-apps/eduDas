import Doubt from '../../models/Doubt.js';
// Update a chat within a doubt
const updateChat = async (req, res) => {
    try {
        const { doubtId, chatId } = req.params;
        const { chat } = req.body;

        const doubt = await Doubt.findById(doubtId);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        const chatItem = doubt.chats.id(chatId);
        if (!chatItem) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        chatItem.chat = chat;
        await doubt.save();

        res.status(200).json(doubt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export default updateChat;