export default {
    setMeetingNotes(state, payload){
        state.loadedMeetingNotes = payload;
    },
    createMeetingNote (state, payload) {
        state.loadedMeetingNotes.push(payload);
      }
}