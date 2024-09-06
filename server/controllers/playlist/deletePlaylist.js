import Playlist from '../../models/Playlist.js';

const deletePlaylist = async (req, res) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,
            { $set: { is_deleted: true } },
            { new: true }
        );

        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        return res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting playlist', error });
    }
};

export default deletePlaylist;