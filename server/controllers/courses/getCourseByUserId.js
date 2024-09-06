import Course from '../../models/Course.js';

const getCourseByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ users: req.params.id }).populate({
            path: 'users',
            select: 'firstName lastName'
        }).sort({ createdAt: -1 });
        if (!courses || courses.length === 0) {
            return res.status(404).send({ message: 'No courses found for this user.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        // console.error("Error fetching courses:", error);
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

export default getCourseByUserId;
