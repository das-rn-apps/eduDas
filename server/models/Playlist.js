import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    class: { type: String, default: '' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    videos_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
}, {
    timestamps: true
});

export default mongoose.model('Playlist', playlistSchema);
