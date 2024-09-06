import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    class: { type: String, required: true },
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    photo: { type: String, default: '' },
    language: { type: String, default: '' },
    isFree: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    startDate: Date,
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseContent' },
    doubt: { type: mongoose.Schema.Types.ObjectId, ref: 'Doubt' },
    videos: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoList' },
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test', default: [] }],
}, {
    timestamps: true
});

export default mongoose.model('Course', courseSchema);
