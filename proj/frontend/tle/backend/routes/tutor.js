const router = require('express').Router();
const Course = require('../models/Course.js');
const Videos = require('../models/Videos.js');

router.post("/addCourse", async (req, res) => {
    const {courseName,courseDesc,courseContext, courseTutor} = req.body;
    try{
        const course = new Course({
            "courseName": courseName,
            "courseDesc": courseDesc,
            "courseContext": courseContext,
            "courseTutor": courseTutor
        });
        await course.save();
        res.send("Course added successfully");
    }
    catch(err){
        console.log(err);
    }
});

router.get("/getCourses", async (req, res) => {
    try{
        const courses = await Course.find();
        res.send(courses);
    }
    catch(err){
        console.log(err);
    }
});

router.post("/addVideo/:CourseId",async (req,res)=>{
    const {videoName,videoDesc,videoUrl,videoContext} = req.body;
    const {CourseId} = req.params;
    const course = await Course.findById(CourseId);
    if(!course){
        return res.status(400).send("Course not found");
    }
    try{
        const video = new Videos({
            "videoName": videoName,
            "videoDesc": videoDesc,
            "videoUrl": videoUrl,
            "videoContext": videoContext,
            "courseId": CourseId
        });
        await video.save();
        res.send("Video added successfully");
    }
    catch(err){
        console.log(err);
    }
});

router.get("/getVideos/:CourseId", async (req, res) => {
    const {CourseId} = req.params;
    try{
        const videos = await Videos.find({courseId: CourseId});
        res.send(videos);
    }
    catch(err){
        console.log(err);
    }
});

module.exports = router;
