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
                    liveDate:       moment(obj[key].liveDate).format('DD/MM/YYYY'),
                    demoDate:       moment(obj[key].demoDate).format('DD/MM/YYYY'),
                    stagingDate:    moment(obj[key].stagingDate).format('DD/MM/YYYY'),
                    develDate:      moment(obj[key].develDate).format('DD/MM/YYYY'),
                    milestone:      obj[key].milestone,
                    appStatus:      obj[key].appStatus,
                    liveLink:       obj[key].liveLink,
    	            demoLink:       obj[key].demoLink,
		            stagingLink:    obj[key].stagingLink,
                    develLink:      obj[key].develLink,
                    iconPath:       apiEndpoint + obj[key].path
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
  createMobileProject({commit}, payload){
      console.log(payload)
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
    commit('setLoading', true);
    axios.post(apiEndpoint + 'mobileProjects', mobileProject)
    .then((response) => {
        console.log(response)
        commit('setLoading', false);
    })
    .catch((err) => {
        commit('setLoading', false);
    })
  },

  deleteMobileProject({commit, state}, payload){
    console.log(payload)
    console.log("TODO Delete everthing abou app and documents and details")
  }
}