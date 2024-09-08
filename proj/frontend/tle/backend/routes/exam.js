const router = require('express').Router();
const Exam = require('../models/Exam');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post("/generateExam", upload.single('file'), async (req, res) => {
    const { examName, examDuration } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {

        const fileBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(fileBuffer);
        const examText = pdfData.text; 

        const genAI = new GoogleGenerativeAI('AIzaSyCUkLNSwx-145fQ0S5BDou2AwJYjvPRW5g');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Generate question and answers for a ${examDuration}-minute exam based on the following text: "${examText}". The answers should be detailed. Provide the response in JSON format with keys: "question", "answer", "useranswer", and "score".`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}') + 1;
        const jsonResponse = text.substring(startIndex, endIndex);
        const generatedQuestions = JSON.parse(jsonResponse).questions;

        const exam = new Exam({
            examname: examName,
            examtext: examText,
            questions: generatedQuestions.map(question => ({
                question: question.question,
                answer: question.answer,
                useranswer: '',
                score: 0
            })),
            examdate: new Date(),
            examduration: examDuration,
            exammarks: 0,
            examstatus: false
        });

        await exam.save();
        res.send({ exam });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate the exam.' });
    } finally {
        fs.unlinkSync(req.file.path);
    }
});

router.get('/getexam/:examId', async (req, res) => {
    const examId = req.params.examId;
    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).send({ error: 'Exam not found' });
        }
        res.send({ questions: exam.questions, examduration: exam.examduration });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});

router.put('/check/:examId', async (req, res) => {
    const examId = req.params.examId;
    const { answers } = req.body;
    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).send({ error: 'Exam not found' });
        }
        exam.questions.forEach((question, index) => {
            question.useranswer = answers[index];
            console.log(question.useranswer);
        });

        const genAI = new GoogleGenerativeAI('AIzaSyCUkLNSwx-145fQ0S5BDou2AwJYjvPRW5g');
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const sendingText = JSON.stringify(exam.questions.map(question => ({
            question: question.question,
            answer: question.answer,
            useranswer: question.useranswer,
            score: 0
        })));
        const sendtext = `Evaluate the following questions and answers. For each question, compare the user's answer with the correct answer and assign a score between 0 and 10 based on the correctness(0 being the lowest and 10 being the highest). Provide the scores in JSON format. The answers should be evaluated on their correctness. Answers that are completely correct should receive a score of 10, and answers that are completely wrong should receive a score of 0. If the answer is releated but not the exact answer give grace score or half score. Partial credits are acceptable and should be reflected in the score. ${sendingText}`;
        const result = await model.generateContent(sendtext);
        const response = await result.response;
        const text = await response.text();
        const jsonResponse = JSON.parse(text);

        exam.questions.forEach((question, index) => {
            question.score = jsonResponse[index].score;
        });

        const totalScore = exam.questions.reduce((sum, question) => sum + question.score, 0);
        exam.exammarks = totalScore / exam.questions.length;
        exam.examstatus = true;

        await exam.save();

        res.send({ exam });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});
router.get('/results/:examId', async (req, res) => {
    const examId = req.params.examId;
    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).send({ error: 'Exam not found' });
        }
        res.send({ exam });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
    }
});
module.exports = router;
