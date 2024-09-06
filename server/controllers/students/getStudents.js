import User from '../../models/User.js';

const getStudents = async (req, res) => {
    try {
        const students = await User.find({ is_deleted: false });

        res.status(200).send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default getStudents;
