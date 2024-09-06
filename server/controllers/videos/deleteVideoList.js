import VideosList from '../../models/VideosList.js';

const deleteVideoList = async (req, res) => {
    try {
        const videoList = await VideosList.findById(req.params.id);
        if (!videoList) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        videoList.is_deleted = true;
        await videoList.save();
        res.status(200).json({ message: 'Video list deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default deleteVideoList;
