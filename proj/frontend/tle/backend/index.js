const express = require('express');
const app = express();
const PORT = 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const examRoutes = require('../backend/routes/exam.js');
const studyRoutes = require('../backend/routes/study.js');
const doubtRoutes = require('../backend/routes/doubts.js');
const tutorRoutes = require('../backend/routes/tutor.js');
const chatRoutes = require('../backend/routes/chat.js');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Tvarun2014:varunreddy2014@cluster0.cc98p65.mongodb.net/TLE')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error: ', err);
    });

app.use("/exam",examRoutes);
app.use("/study",studyRoutes);
app.use("/doubt",doubtRoutes);
app.use("/tutor",tutorRoutes);
app.use("/chat",chatRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

