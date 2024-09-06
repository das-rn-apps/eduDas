import mongoose from 'mongoose';

const practicePaperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pdfUrl: { type: String },
    class: { type: String, default: '' },
    photo: { type: String, default: '' },
    language: { type: String, default: '' },
}, {
    timestamps: true
});

export default mongoose.model('PracticePaper', practicePaperSchema);
