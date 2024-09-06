import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    is_deleted: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    password1: { type: String },
    type: { type: String },
    dateOfBirth: Date,
    lastLogin: Date,
    class: { type: String },
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }]
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
