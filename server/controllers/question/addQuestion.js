import Test from "../../models/Test.js";
const addQuestion = async (req, res) => {
    try {
        const newQuestion = req.body;
        // console.log("Received newQuestion:", newQuestion);

        const {
            question,
            option_1,
            option_2,
            option_3,
            option_4,
            correctAnswer,
            photo,
        } = newQuestion;

        // Validate the rest of the fields
        if (!question || !correctAnswer || !photo || !option_1 || !option_2 || !option_3 || !option_4) {
            return res.status(400).json({ error: 'Invalid question data' });
        }
        // console.log(req.params.id);
        const test = await Test.findOne({ _id: req.params.id });


        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        const formattedQuestion = {
            number: test.questions.length + 1,
            question,
            options: [
                { label: 'a', text: option_1 },
                { label: 'b', text: option_2 },
                { label: 'c', text: option_3 },
                { label: 'd', text: option_4 },
            ],
            correctAnswer,
            photo,
        };

        test.questions.push(formattedQuestion);

        await test.save();

        return res.status(200).json({ message: 'Question added successfully', test });
    } catch (error) {
        // console.error('Error adding question to test:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export default addQuestion;