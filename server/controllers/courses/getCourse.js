import Course from '../../models/Course.js';

const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({ is_deleted: false }).sort({ startDate: -1 });
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

export default getCourse;
