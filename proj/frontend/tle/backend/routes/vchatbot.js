const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI('AIzaSyCUkLNSwx-145fQ0S5BDou2AwJYjvPRW5g');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// API Route for handling video chatbot responses with context
router.post('/api/video-chatbot/response', async (req, res) => {
    const { text, videoContext } = req.body;

    if (!text || !videoContext) {
        return res.status(400).send('Text and video context are required');
    }

    try {
        // Combine user input with video context
        const combinedText = `${text} Context: ${videoContext}`;
        const response = await model.generateContent(combinedText);
        res.send(response.response.text());
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).send('Error generating response');
    }
});

module.exports = router;
