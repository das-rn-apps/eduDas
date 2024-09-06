import Course from '../../models/Course.js';

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).send(course);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
}

export default deleteCourse;
