import Doubt from '../../models/Doubt.js';

// Create a new doubt
const createDoubt = async (req, res) => {
    try {
        const { course_id, className } = req.body;

        // Check if a doubt with the same course_id already exists
        const existingDoubt = await Doubt.findOne({ course_id });

        if (existingDoubt) {
            return res.status(400).json({ message: 'Doubt with this course_id already exists' });
        }

        // Create a new doubt if no existing doubt is found
        const doubt = new Doubt({
            course_id,
            class: className,
        });

        await doubt.save();
        res.status(201).json(doubt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default createDoubt;
