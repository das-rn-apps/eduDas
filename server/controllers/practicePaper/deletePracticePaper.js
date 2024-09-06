import PracticePaper from '../../models/PracticePaper.js';

const deletePracticePaper = async (req, res) => {
    try {
        const { id } = req.params;
        const practicePaper = await PracticePaper.findByIdAndDelete(id);
        if (!practicePaper) {
            return res.status(404).json({ message: 'Practice paper not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default deletePracticePaper;
