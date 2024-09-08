const router = require('express').Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post("/studyPlanner", async (req, res) => {
    const {studyPlan,timeDuration} = req.body;
    try{
        const genAI = new GoogleGenerativeAI('AIzaSyCUkLNSwx-145fQ0S5BDou2AwJYjvPRW5g');
        const model = genAI.getGenerativeModel({model : "gemini-pro"});
//      const prompt = `Generate study plan for the following text: ${studyPlan} for time duration${timeDuration}.No need of materials, resources or other. Give day wise with topics. The study plan should be in JSON format. Give without extra spaces, new lines or special characters. Give each day's plan in a seperate line. If there are more days, then give as a range of days for few. Keys for each day should be as a number`;
        const prompt = `Generate study plan for the following text: ${studyPlan} for time duration${timeDuration}. Give day wise topics. If there are more days, give as a range of days for few. The response should be in JSON format.
        Take the following example as the syntax for the structure
        "Day Numbers/Range"{
        "Hours of Study" : "Provide hours required to complete the topic in string format",
        "Topics" : "Provide the topics name" ,
        "Subtopic" : "Provide the subtopic" ,
        "Exercises" : "Provide the exercises"
        }
        `
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

