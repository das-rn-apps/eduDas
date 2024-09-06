import PracticePaper from '../../models/PracticePaper.js';

const getAllPracticePapers = async (req, res) => {
    try {
        const practicePapers = await PracticePaper.find();
        res.status(200).json(practicePapers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default getAllPracticePapers;
