import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    playlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
    class: { type: String, default: '' },
    videoId: { type: String, required: true },
    videoName: { type: String, required: true },
    duration: { type: String, required: true, default: '00:00' }
}, {
    timestamps: true
});

export default mongoose.model('Video', videoSchema);
