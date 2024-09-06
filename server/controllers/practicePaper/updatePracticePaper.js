import PracticePaper from '../../models/PracticePaper.js';

const updatePracticePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findByIdAndUpdate(id, req.body, { new: true });
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(200).json(practicePaper);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default updatePracticePaper;
