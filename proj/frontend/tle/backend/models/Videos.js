const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosSchema = new Schema({
    videoName: { type: String, required: true },
    videoDesc: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoContext : { type: String, required: true },
    courseId : { type: String, required: true }
});

module.exports = mongoose.model('Videos', VideosSchema);