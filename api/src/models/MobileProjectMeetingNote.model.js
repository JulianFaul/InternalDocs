const mongoose = require('mongoose');

let MobileProjectMeetingNoteSchema = new mongoose.Schema({
    projectID: {
        type: mongoose.Schema.ObjectId
    },
    creatorName:  String,
    date:         Date,
    note:         String,
    title:        String,
    createdAt:{
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('MobileProjectMeetingNote', MobileProjectMeetingNoteSchema);