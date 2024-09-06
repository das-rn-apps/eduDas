import mongoose from 'mongoose';
import Course from '../../models/Course.js';

const addCourseByUserId = async (req, res) => {
    const { user_id, course_id } = req.params;
    // console.log(req.params);
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(course_id)) {
        return res.status(400).send({ message: 'Invalid user or course ID format.' });
    }

    try {
        // Find the course by ID
        const course = await Course.findById(course_id);

        if (!course) {
            // console.log("Course not found.");
            return res.status(404).send({ message: 'Course not found.' });
        }

        // Check if user is already enrolled
        if (course.users.includes(user_id)) {
            // console.log("User already enrolled in the course.");
            return res.status(400).send({ message: 'User already enrolled in the course.' });
        }

        // Add user to the course
        course.users.push(user_id);

        // Save the updated course
        await course.save();

        // Respond with the updated course
        res.status(200).send(course);
    } catch (error) {
        // console.error("Error adding user to course:", error);
        res.status(500).send({ message: 'Internal Server Error', error });
    }
}

export default addCourseByUserId;
