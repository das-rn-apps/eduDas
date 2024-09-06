import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    label: { type: String, required: true },
    text: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [optionSchema], required: true },
    correctAnswer: { type: String, required: true },
    givenAnswer: { type: String },
    isRight: { type: Boolean, required: true },
    photo: { type: String },
});

const submittedTestSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: { type: [questionSchema], required: true },
    total_marks: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.model('SubmittedTest', submittedTestSchema);
