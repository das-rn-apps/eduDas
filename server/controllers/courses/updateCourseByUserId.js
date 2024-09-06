import Course from '../../models/Course.js';

const updateCourseByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const course = await Course.findOneAndUpdate(
            { students: userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send({ error: 'Bad Request', details: error.message });
    }
}

export default updateCourseByUserId;
