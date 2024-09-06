import CourseContent from '../../models/CourseContent.js'; // Adjust the path and extension as needed

const deleteCourseContent = async (req, res) => {
    try {
        const courseContent = await CourseContent.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(500).send({ message: 'Error deleting course content', error: error.message });
    }
};

export default deleteCourseContent;
