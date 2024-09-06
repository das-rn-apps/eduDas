import mongoose from 'mongoose';
import Test from '../../models/Test.js';
import Course from '../../models/Course.js';

const getTestById = async (req, res) => {
    try {
        const testId = mongoose.Types.ObjectId(req.params.id);

        const result = await Test.aggregate([
            { $match: { _id: testId, is_deleted: false } },
            {
                $lookup: {
                    from: 'courses', // Ensure this matches your actual collection name
                    localField: '_id',
                    foreignField: 'tests',
                    as: 'course'
                }
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } }
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Test not found or no associated course' });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getTestById;
