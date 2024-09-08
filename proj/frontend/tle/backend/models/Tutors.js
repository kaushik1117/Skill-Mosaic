const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    tutorName: { type: String, required: true },
    tutorBio: { type: String, required: true },
    tutorEmail: { type: String, required: true },
    tutorRating: { type: Number, default: 0 },
    tutorStatus: { type: Boolean, default: false }
});

module.exports = mongoose.model('Tutor', TutorSchema);