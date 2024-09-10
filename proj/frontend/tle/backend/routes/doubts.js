const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
router.post("/solveDoubt", async (req, res) => {
    const {doubt} = req.body;
    try{
        const genAI = new GoogleGenerativeAI(process.env.Gemini_KEY);
        const model = genAI.getGenerativeModel({model : "gemini-1.5-pro"});
        const prompt = `I have this doubt : ${doubt}. Can you help me with this? Give response as a text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        res.send(text);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;

