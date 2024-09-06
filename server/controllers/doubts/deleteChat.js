import Doubt from '../../models/Doubt.js';

// Soft delete a chat within a doubt
const deleteChat = async (req, res) => {
    try {
        const { doubtId, chatId } = req.params;

        const doubt = await Doubt.findById(doubtId);
        if (!doubt) {
            return res.status(404).json({ error: 'Doubt not found' });
        }

        const chat = doubt.chats.id(chatId);
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }

        chat.is_deleted = true;
        await doubt.save();

        res.status(200).json({ message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default deleteChat;