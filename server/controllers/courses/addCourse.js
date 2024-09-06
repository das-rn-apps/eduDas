import Course from '../../models/Course.js';
import Doubt from '../../models/Doubt.js';
import Playlist from '../../models/Playlist.js';
import CourseContent from '../../models/CourseContent.js';

const addCourse = async (req, res) => {
    try {
        const { classLevel, name, ...rest } = req.body;

        // Ensure required fields are provided
        if (!classLevel || !name) {
            return res.status(400).send({ error: 'Required fields missing: classLevel and name are required.' });
        }

        // Create and save the Doubt document
        const newDoubt = new Doubt({
            class: classLevel,
        });
        const savedDoubt = await newDoubt.save();

        // Create and save the Playlist document
        const newPlaylist = new Playlist({
            name,
            class: classLevel
        });
        const savedPlaylist = await newPlaylist.save();

        const newCourseContent = new CourseContent({
            name: `${name} Content`,
            class: classLevel
        });
        const savedCourseContent = await newCourseContent.save();

        // Create and save the Course document
        const course = new Course({
            ...rest,
            name,
            class: classLevel,
            doubt: savedDoubt._id,
            playlist: savedPlaylist._id,
            content: savedCourseContent._id,
        });
        const savedCourse = await course.save();

        // Update the Doubt and Playlist documents with the course ID
        savedDoubt.course_id = savedCourse._id;
        savedPlaylist.course_id = savedCourse._id;
        savedCourseContent.course_id = savedCourseContent._id;
        await savedDoubt.save();
        await savedPlaylist.save();
        await savedCourseContent.save();

        // Send the response
        res.status(201).send(savedCourse);
    } catch (error) {
        console.error('Error creating course:', error.message || error);
        res.status(400).send({ error: 'Error creating course', details: error.message });
    }
};

export default addCourse;
