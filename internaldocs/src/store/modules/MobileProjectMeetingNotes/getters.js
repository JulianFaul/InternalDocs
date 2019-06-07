export default {
    loadedMeetingNotes(state){
        return state.loadedMeetingNotes;
    },
    loadedMeetingNote(state){
        return (meetingNoteID) => {
            return state.loadedMeetingNotes.find((meeting) => {
                return meeting.id == meetingNoteID
            })
        }
    }
}

