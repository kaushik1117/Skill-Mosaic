const router = require('express').Router();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// API Route for handling chatbot responses
router.post('/api/chatbot/response', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).send('Text is required');
    }

    try {
        const genAI = new GoogleGenerativeAI('AIzaSyCUkLNSwx-145fQ0S5BDou2AwJYjvPRW5g');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resp = await model.generateContent(text);
        console.log(resp.response.text());
        res.send(resp.response.text());
    } catch (error) {   
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

module.exports = router;