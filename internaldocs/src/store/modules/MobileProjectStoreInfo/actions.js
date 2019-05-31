import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
    createStoreInfo({commit,dispatch}, payload){
        commit('setLoading', true);
        axios.post(apiEndpoint + "mobileProjects/" + payload.projectID + "/storeinfo", payload)
        .then((response) => {
            let data = response.data;
            let storeInfo = {
                id:             data._id,
                appType:        data.appType,
                nameOnStore:    data.nameOnStore,
                devices:        data.devices,
                dateSubmitted:   data.dateSubmitted,
                datePublished:  data.datePublished,
                version:        data.version,
                storeLink:      data.storeLink,
                whatsnew:       data.whatsnew,
                createdAt:      data.createdAt,
                tag:            data.tag,
            }
            commit('createStoreInfo', storeInfo)
            commit('snackbar',{show: true, message: 'Store Info Created'});
            commit('setLoading', false);
            dispatch('getStoreInfo', payload.projectID)
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
    },

    getStoreInfo({commit}, projectID){
        commit('setLoading', true);
        axios.get(apiEndpoint + "mobileProjects/" + projectID + "/storeinfo")
        .then((response) => {
            let data = response.data;
            let storeInfo = []
            for (let key in data){
                storeInfo.push({
                    id:             data[key]._id,
                    appType:        data[key].appType,
                    nameOnStore:    data[key].nameOnStore,
                    devices:        data[key].devices,
                    dateSubmitted:   data[key].dateSubmitted,
                    datePublished:  data[key].datePublished,
                    version:        data[key].version,
                    storeLink:      data[key].storeLink,
                    whatsnew:       data[key].whatsnew,
                    tag:            data[key].tag,
                    createdAt:      data[key].createdAt
                })
            }
            commit('setloadedStoreInfo', storeInfo)
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err)
        })
    },

    deleteStoreInfo({commit}, storeInfoID){
        commit('setLoading', true);
        axios.delete(apiEndpoint + "storeinfo/" + storeInfoID)
        .then((response) => {
            commit("removeStoreInfo", storeInfoID)
            commit('snackbar',{show: true, message: 'Store Info Deleted'});
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err)
            commit('setLoading', false);
        })
    }
}