import Video from '../../models/Video.js';
import Playlist from '../../models/Playlist.js';

const appendVideo = async (req, res) => {
    try {
        const id = req.params.id;
        const { videoId, videoName, duration } = req.body;

        // Create new Video
        const newVideo = new Video({
            playlist_id: id,
            videoId,
            videoName,
            duration,
        });

        const savedVideo = await newVideo.save();

        // Update Playlist with new Video ID
        await Playlist.findByIdAndUpdate(
            id,
            { $push: { videos_id: savedVideo._id } },
            { new: true }
        );

        return res.status(201).json({ message: 'Video created and added to playlist successfully', video: savedVideo });
    } catch (error) {
        console.error('Error creating video and updating playlist:', error); // Log the error
        return res.status(500).json({ message: 'Error creating video and updating playlist', error });
    }
};

export default appendVideo;
