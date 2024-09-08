const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: { type: String, required: true },
    courseDesc: { type: String, required: true },
    courseContext: { type: String, required: true },
    courseTutor: { type: String, required: true },
    courseRating: { type: Number, default: 0 },
    courseStatus: { type: Boolean, default: false }
});

module .exports = mongoose.model('Course', CourseSchema);