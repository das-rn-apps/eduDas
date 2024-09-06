import CourseContent from '../../models/CourseContent.js';

const createCourseContent = async (req, res) => {
    try {
        const newCourseContent = new CourseContent(req.body);
        await newCourseContent.save();
        res.status(201).send(newCourseContent);
    } catch (error) {
        res.status(400).send({ message: 'Error creating course content', error: error.message });
    }
};

export default createCourseContent;
