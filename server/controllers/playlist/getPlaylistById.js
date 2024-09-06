import Playlist from '../../models/Playlist.js';

const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('videos_id');

        if (!playlist || playlist.is_deleted) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        return res.status(200).json(playlist);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching playlist', error });
    }
};

export default getPlaylistById;