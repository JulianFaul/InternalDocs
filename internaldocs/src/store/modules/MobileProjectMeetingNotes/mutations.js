export default {
    setMeetingNotes(state, payload){
        state.loadedMeetingNotes = payload;
    },
    createMeetingNote (state, payload) {
        state.loadedMeetingNotes.push(payload);
    },
    updateMeeting(state, payload){
        let meeting = state.loadedMeetingNotes.find((meeting) => {
            return meeting.id === payload.meetingID
        })
        meeting.id          = payload.id;
        meeting.creatorName = payload.creatorName;
        meeting.date        = payload.date;
        meeting.note        = payload.note;
        meeting.title       = payload.title;
    },
    deleteMeetingNote(state, payload){
        const meetingNotes = state.loadedMeetingNotes;
        meetingNotes.splice(meetingNotes.findIndex(meetingNote => meetingNote.id === payload), 1)
    }
}

