const MobileProjectMeetingNote = require('../models/MobileProjectMeetingNote.model');


exports.index = (req, res) => {
    MobileProjectMeetingNote.find({projectID: req.params.id}, (err, meetingNotes) => {
        if(err){
            return res.status(404).send(meetingNotes);
        }
        res.json(meetingNotes)
    })
}

exports.create = (req, res) => {
    const newMobileProjectMeetingNote = new MobileProjectMeetingNote(req.body)
    console.log(req.body)
    newMobileProjectMeetingNote.save()
    .then(meetingNote => {
        if (!meetingNote || meetingNote.length === 0){
            return res.status(404).send(meetingNote);
        }
        res.status(201).send(meetingNote)
    })
    .catch(err => {
       res.status(500).json(err)
    })
}