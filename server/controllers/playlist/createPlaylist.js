import mongoose from 'mongoose';
import Video from '../../models/Video.js';
import Playlist from '../../models/Playlist.js';

const createPlaylist = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { playlist_id, class: className, videoId, videoName, duration } = req.body;

        // Create the Video document
        const newVideo = new Video({
            playlist_id,
            class: className,
            videoId,
            videoName,
            duration,
        });

        const savedVideo = await newVideo.save({ session });

        // Add the Video ID to the Playlist's videos_id array
        await Playlist.findByIdAndUpdate(
            playlist_id,
            { $push: { videos_id: savedVideo._id } },
            { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({ message: 'Video created and added to playlist successfully', video: savedVideo });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Error creating video and updating playlist', error });
    }
};

export default createPlaylist;