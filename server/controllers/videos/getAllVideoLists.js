import Playlist from '../../models/Playlist.js';

const getAllVideoLists = async (req, res) => {
    try {
        const videoLists = await Playlist.find({ is_deleted: false }).sort({ createdAt: -1 });
        if (videoLists.length === 0) {
            return res.status(404).json({ message: 'No video lists found' });
        }
        res.status(200).json(videoLists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getAllVideoLists;
