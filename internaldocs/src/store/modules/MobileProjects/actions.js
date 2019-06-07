import axios from 'axios';
import moment from 'moment';

const apiEndpoint = process.env.API_URL;
export default {
  getMobileProjects({commit}){
    commit('setLoading', true);
    axios.get(apiEndpoint + 'mobileProjects')
        .then((response) => {
            const mobileProjects = [];
            const obj = response.data;
            for(let key in obj){
                mobileProjects.push({
                    id:             obj[key]._id,
                    appTitle:       obj[key].appTitle,
                    appSubtitle:    obj[key].appSubtitle,
                    appVersion:     obj[key].appVersion ,
                    country:        obj[key].country,
                    appType:        obj[key].appType,
                    productType:    obj[key].productType,
                    priority:       obj[key].priority,
                    appLive:        obj[key].appLive,
                    appDemo:        obj[key].appDemo,
                    appStaging:     obj[key].appStaging,
                    appDevel:       obj[key].appDevel,
                    liveDate:       moment(obj[key].liveDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(obj[key].liveDate).format('DD/MM/YYYY'),
                    demoDate:       moment(obj[key].demoDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(obj[key].demoDate).format('DD/MM/YYYY'),
                    stagingDate:    moment(obj[key].stagingDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(obj[key].stagingDate).format('DD/MM/YYYY'),
                    develDate:      moment(obj[key].develDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(obj[key].develDate).format('DD/MM/YYYY') ,
                    milestone:      obj[key].milestone,
                    appStatus:      obj[key].appStatus,
                    liveLink:       obj[key].liveLink,
    	            demoLink:       obj[key].demoLink,
		            stagingLink:    obj[key].stagingLink,
                    develLink:      obj[key].develLink,
                    iconPath:       obj[key].path ? apiEndpoint + obj[key].path : undefined 
                })
            }
            commit('setMobileProjects',mobileProjects);
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err);
            commit('setLoading', false);
        })
  },
  updateMobileProject({commit, dispatch}, payload){
    commit('setLoading', true);
    let mobileProject = new FormData();
        mobileProject.append('file',payload.icon);
        mobileProject.append('appTitle',payload.appTitle);
        mobileProject.append('appSubtitle',payload.appSubtitle);
        mobileProject.append('appVersion',payload.appVersion);
        mobileProject.append('country',payload.country);
        mobileProject.append('appType',payload.appType);
        mobileProject.append('priority',payload.priority);
        mobileProject.append('productType',payload.productType);
        mobileProject.append('appLive',payload.appLive);
        mobileProject.append('appDemo',payload.appDemo);
        mobileProject.append('appStaging',payload.appStaging);
        mobileProject.append('appDevel',payload.appDevel);
        mobileProject.append('liveDate',payload.liveDate);
        mobileProject.append('demoDate',payload.demoDate);
        mobileProject.append('stagingDate',payload.stagingDate);
        mobileProject.append('develDate',payload.develDate);
        mobileProject.append('milestone',payload.milestone);
        mobileProject.append('appStatus',payload.appStatus);
        mobileProject.append('liveLink',payload.liveLink);
        mobileProject.append('demoLink',payload.demoLink);
        mobileProject.append('stagingLink',payload.stagingLink);
        mobileProject.append('develLink',payload.develLink);

    axios.put(apiEndpoint + 'mobileProjects/' + payload.projectID, mobileProject)
    .then((response) => {
        commit('updateMobileProject', {
            ...payload,
            iconPath:     response.data.path ? apiEndpoint + response.data.path : undefined,
            stagingDate:  moment(payload.stagingDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(payload.stagingDate).format('DD/MM/YYYY'),
            demoDate:     moment(payload.demoDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(payload.demoDate).format('DD/MM/YYYY'),
            liveDate:     moment(payload.liveDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(payload.liveDate).format('DD/MM/YYYY'),
            develDate:    moment(payload.develDate).format('DD/MM/YYYY') === 'Invalid date' ? "&nbsp;" : moment(payload.develDate).format('DD/MM/YYYY'),
            
        })
        commit('snackbar',{show: true, message: 'Project Updated'});
        dispatch('getMobileProjects');
        commit('setLoading', false);

    })
    .catch((err) => {
        commit('setLoading', false);
    })
  },


  createMobileProject({commit,dispatch}, payload){
    commit('setLoading', true);
    let mobileProject = new FormData();
        mobileProject.append('file',               payload.icon);
        mobileProject.append('appTitle',           payload.appTitle);
        mobileProject.append('appSubtitle',        payload.appSubtitle);
        mobileProject.append('appVersion',         payload.appVersion);
        mobileProject.append('country',            payload.country);
        mobileProject.append('appType',            payload.appType);
        mobileProject.append('priority',           payload.priority);
        mobileProject.append('productType',        payload.productType);
        mobileProject.append('appLive',            payload.appLive);
        mobileProject.append('appDemo',            payload.appDemo);
        mobileProject.append('appStaging',         payload.appStaging);
        mobileProject.append('appDevel',           payload.appDevel);
        mobileProject.append('liveDate',           payload.liveDate);
        mobileProject.append('demoDate',           payload.demoDate);
        mobileProject.append('stagingDate',        payload.stagingDate);
        mobileProject.append('develDate',          payload.develDate);
        mobileProject.append('milestone',          payload.milestone);
        mobileProject.append('appStatus',          payload.appStatus);
        mobileProject.append('liveLink',           payload.liveLink);
        mobileProject.append('demoLink',           payload.demoLink);
        mobileProject.append('stagingLink',        payload.stagingLink);
        mobileProject.append('develLink',          payload.develLink);
        axios.post(apiEndpoint + 'mobileProjects', mobileProject)
        .then((response) => {
            commit('createMobileProject', {
                ...response.data,
                id: response.data._id
            })
            dispatch("getMobileProjects");
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
        })
  },

deleteMobileProject({commit, dispatch}, projectID){
    commit('setLoading', true);
    axios.delete(apiEndpoint + 'mobileProjects/' + projectID)
    .then((response) => {
        // ---------------------------
        axios.delete(apiEndpoint + 'specfiles', {data:{projectID: projectID}})
        .catch((err) => {
            console.log(err)
        })
        // ---------------------------
        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/specs')
        .catch((err) => {
            console.log(err)
        })
        
        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/info')
        .catch((err) => {
            console.log(err)
        })

        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/storeinfo')
        .catch((err) => {
            console.log(err)
        })
        // ---------------------------
        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/meetingNote')
        .catch((err) => {
            console.log(err)
        })
        
    })
    .then(() => {
        commit('deletemobileProject', projectID)
        dispatch('getMobileProjects')
        commit('setLoading', false);
    })
    .catch((err) => {
        commit('setLoading', false);
        console.log(err)
    })
  }
}