import CourseContent from '../../models/CourseContent.js';

const updateCourseContent = async (req, res) => {
    try {
        const courseContent = await CourseContent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!courseContent) {
            return res.status(404).send({ message: 'Course content not found' });
        }
        res.status(200).send(courseContent);
    } catch (error) {
        res.status(400).send({ message: 'Error updating course content', error: error.message });
    }
};

export default updateCourseContent;
