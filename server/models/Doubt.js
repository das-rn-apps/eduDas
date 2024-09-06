import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    sender_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    chat: { type: String, required: true },
}, {
    timestamps: true
});

const doubtSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    chats: { type: [chatSchema], default: [] },
    class: { type: String, default: '' },
}, {
    timestamps: true
});

export default mongoose.model('Doubt', doubtSchema);
