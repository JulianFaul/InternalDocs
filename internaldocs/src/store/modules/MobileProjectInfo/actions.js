import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
    getStatInfo({commit}, projectID){
        commit('setLoading', true);
        axios.get(apiEndpoint + 'mobileProjects/'+projectID+'/info')
        .then((response) => {
            if(response.data){
                commit('setLoading', false);
                commit("setAppInfo", response.data)
            }else{
                commit('setLoading', false);
                commit("setAppInfo", {})
            }
            
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
    },

    createStatInfo({commit}, payload){
        commit('setLoading', true);
        let projectID = payload.projectID
        axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/info', payload.data)
        .then((response) => {
            let info = {
                id: response.data._id,
                ...response.data
            }
            commit('createStatInfo', info);
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
    },
    updateStatInfo({commit}, payload){
        commit('setLoading', true);
        let projectID = payload.projectID;
        let infoID = payload.infoID
        let updateObj = {}
        if(payload.data.url){
            updateObj.url = payload.data.url
        }
        if(payload.data.username){
            updateObj.username = payload.data.username
        }
        if(payload.data.password){
            updateObj.password = payload.data.password
        }
        axios.put(apiEndpoint + 'mobileProjects/' + projectID + '/info/' + infoID, updateObj)
        .then((response) => {
            commit('updateInfo', payload.data);
            commit('snackbar',{show: true, message: 'Info Updated'});
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
    }
}