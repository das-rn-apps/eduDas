import Video from '../../models/Video.js';
import Playlist from '../../models/Playlist.js';

const updatePlaylist = async (req, res) => {

    try {
        const { playlist_id, className, videoId, videoName, duration } = req.body;

        const newVideo = new Video({
            playlist_id,
            class: className,
            videoId,
            videoName,
            duration,
        });

        const savedVideo = await newVideo.save();

        await Playlist.findByIdAndUpdate(
            playlist_id,
            { $push: { videos_id: savedVideo._id } },
            { new: true, session }
        );

        return res.status(201).json({ message: 'Video created and added to playlist successfully', video: savedVideo });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating video and updating playlist', error });
    }
};

export default updatePlaylist;