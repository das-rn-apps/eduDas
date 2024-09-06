import Course from '../../models/Course.js';

const updateCourseByID = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        return res.status(200).json(course);
    } catch (error) {
        return res.status(400).json({
            error: 'Bad Request',
            message: error.message,
        });
    }
};

export default updateCourseByID;
