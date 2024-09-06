import mongoose from 'mongoose';
const optionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    question: { type: String, required: true },
    options: [optionSchema],
    correctAnswer: { type: String, required: true },
    photo: { type: String, default: '' },
});


const testSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    name: { type: String, required: true },
    questions: [questionSchema],
    description: { type: String, default: '' },
    duration: { type: String, default: '' },
    photo: { type: String, default: '' },
    language: { type: String, default: '' },
    class: { type: String, default: '' },
    startDate: { type: Date, default: new Date() },
}, {
    timestamps: true
});

export default mongoose.model('Test', testSchema);