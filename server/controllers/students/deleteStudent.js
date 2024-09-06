import User from '../../models/User.js';

const deleteStudent = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { is_deleted: true },
            { new: true } // Return the updated document
        );
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export default deleteStudent;
