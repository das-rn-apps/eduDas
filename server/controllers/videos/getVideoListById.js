import VideosList from '../../models/VideosList.js';
import mongoose from 'mongoose';

const getVideoListById = async (req, res) => {
    try {
        const videoListId = mongoose.Types.ObjectId(req.params.id);
        const videoList = await VideosList.findOne({ _id: videoListId, is_deleted: false });
        if (!videoList) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        res.status(200).json(videoList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getVideoListById;
