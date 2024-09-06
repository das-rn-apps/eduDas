import Playlist from '../../models/Playlist.js';

const getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ is_deleted: false }).populate('videos_id');
        return res.status(200).json(playlists);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching playlists', error });
    }
};

export default getAllPlaylists;