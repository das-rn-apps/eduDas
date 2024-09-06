import Test from '../../models/Test.js';

const createTest = async (req, res) => {
    try {
        const test = new Test(req.body);
        await test.save();
        res.status(201).json(test);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default createTest;
