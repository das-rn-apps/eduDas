import VideosList from '../../models/VideosList.js';

const updateVideoList = async (req, res) => {
    try {
        const videoList = await VideosList.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!videoList || videoList.is_deleted) {
            return res.status(404).json({ message: 'Video list not found' });
        }
        res.status(200).json(videoList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default updateVideoList;
