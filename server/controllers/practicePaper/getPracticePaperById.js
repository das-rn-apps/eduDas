import PracticePaper from '../../models/PracticePaper.js';

const getPracticePaperById = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findById(id);
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(200).json(practicePaper);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default getPracticePaperById;
