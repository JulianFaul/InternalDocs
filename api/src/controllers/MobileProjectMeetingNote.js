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

exports.update = (req, res) => {
    MobileProjectMeetingNote.findById({_id:req.params.meetingNoteID}, (err, meeting) => {
            if(req.body !== undefined) {
                if(req.body.creatorName){
                    meeting.creatorName = req.body.creatorName;
                }
                if(req.body.date){
                    meeting.date        = req.body.date;
                }
                if(req.body.note){
                    meeting.note        = req.body.note;
                }
                if(req.body.title){
                    meeting.title        = req.body.title;
                }
            }
            if(req.body.completed !== undefined) {
                meeting.completed = req.body.completed
            }
        meeting.save((e, updatedMeeting) => {
            if(e) {
                res.status(400).send(e)
            } else {
                res.send(updatedMeeting)
            }
        })
    })
}

exports.deleteSingle = (req, res) => {
    let meetingNoteID = req.params.meetingNoteID;
    MobileProjectMeetingNote.deleteOne({_id:meetingNoteID})
        .then(result => {
           res.status(200).json({
               message: 'Note info has been deleted' 
           })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

    
}

exports.destroy = (req, res) => {
    let projectID = req.params.id;
    MobileProjectMeetingNote.deleteMany({ projectID: projectID})
    .then((result) => {
        res.status(200).json({
            message: 'Meeting Notes has been deleted' 
        })
     })
     .catch(err => {
         res.status(500).json({
             error: err
         })
     })
}