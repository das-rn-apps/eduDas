import Test from '../../models/Test.js';

const getAllTests = async (req, res) => {
    try {
        const results = await Test.aggregate([
            { $match: { is_deleted: false } },
            {
                $lookup: {
                    from: 'courses', // Ensure this matches your actual collection name
                    localField: '_id',
                    foreignField: 'tests',
                    as: 'course'
                }
            },
            { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } }
        ]).sort({ startDate: -1 });

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No tests found' });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getAllTests;
