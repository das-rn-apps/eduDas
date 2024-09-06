import Course from '../../models/Course.js';

const getOtherCourseByUserId = async (req, res) => {
    try {
        const courses = await Course.find({ users: { $nin: [req.params.id] } }).populate({
            path: 'users',
            select: 'firstName lastName'
        }).sort({ startDate: -1 });

        if (!courses || courses.length === 0) {
            return res.status(404).send({ message: 'All courses found for this user.' });
        }
        res.status(200).send(courses);
    } catch (error) {
        // console.error("Error fetching courses:", error);
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

export default getOtherCourseByUserId;
