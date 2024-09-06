import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    videoName: { type: String, required: true },
    duration: { type: String, required: true, default: '00:00' }
});

const videosListSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    videos: { type: [videoSchema], default: [] },
    photo: { type: String, default: '' },
    class: { type: String, default: '' },
}, {
    timestamps: true
});

export default mongoose.model('VideosList', videosListSchema);
