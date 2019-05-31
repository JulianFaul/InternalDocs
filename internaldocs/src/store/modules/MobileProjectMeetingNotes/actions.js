import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
getMeetingNotes({commit}, projectID){
    commit('setLoading', true);
    axios.get(apiEndpoint + 'mobileProjects/'+ projectID + '/meetingNote')
        .then((response) => {
            let data = response.data;
            let meetingNotes = [];
            for(let key in data){
                meetingNotes.push({
                    id:             data[key]._id,
                    projectID:      data[key].projectID,
                    creatorName:    data[key].creatorName,
                    date:           data[key].date,
                    note:           data[key].note
                })
            }
            commit('setMeetingNotes',meetingNotes);
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err);
            commit('setLoading', false);
        })
},
createMeetingNote({commit, dispatch}, payload){
    commit('setLoading', true);
    axios.post(apiEndpoint + 'mobileProjects/'+ payload.projectID + '/meetingNote', payload)
        .then((response) => {
            let note = {
                id:             response.data._id,
                projectID:      payload.projectID,
                creatorName:    payload.creatorName,
                date:           payload.date,
                note:           payload.note
            }
            commit('createMeetingNote', note);
            commit('snackbar',{show: true, message: 'Meeting Note Created'});
            commit('setLoading', false);
            dispatch("getMeetingNotes", payload.projectID)
        })
        .catch((err) => {
            console.log(err);
            commit('setLoading', false);
        })
  },
  deleteMeetingNote({commit}, payload){
    // commit('setLoading', true);
    let projectID = payload.projectID;
    let meetingID = payload.meetingID;
    console.log("delete")
  }
}
