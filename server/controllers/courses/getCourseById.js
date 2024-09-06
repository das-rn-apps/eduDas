import Course from '../../models/Course.js';

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).sort({ createdAt: -1 });

        if (!course) {
            return res.status(404).send({ message: 'Course not found' });
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

export default getCourseById;
