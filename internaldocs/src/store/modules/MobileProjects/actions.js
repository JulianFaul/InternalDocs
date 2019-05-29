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
  updateMobileProject({commit}, payload){
    commit('setLoading', true);
    let mobileProject = new FormData();
    if(payload.icon){
        mobileProject.append('file',payload.icon);
    }
    if(payload.appTitle){
        mobileProject.append('appTitle',payload.appTitle);
    }
    if(payload.appSubtitle){
        mobileProject.append('appSubtitle',payload.appSubtitle);
    }
    if(payload.appVersion){
        mobileProject.append('appVersion',payload.appVersion);
    }
    if(payload.country){
        mobileProject.append('country',payload.country);
    }
    if(payload.appType){
        mobileProject.append('appType',payload.appType);
    }
    if(payload.priority){
        mobileProject.append('priority',payload.priority);
    }
    if(payload.productType){
        mobileProject.append('productType',payload.productType);
    }
    if(payload.appLive){
        mobileProject.append('appLive',payload.appLive);
    }
    if(payload.appDemo){
        mobileProject.append('appDemo',payload.appDemo);
    }
    if(payload.appStaging){
        mobileProject.append('appStaging',payload.appStaging);
    }
    if(payload.appDevel){
        mobileProject.append('appDevel',payload.appDevel);
    }
    if(payload.liveDate){
        mobileProject.append('liveDate',payload.liveDate);
    }
    if(payload.demoDate){
        mobileProject.append('demoDate',payload.demoDate);
    }
    if(payload.stagingDate){
        mobileProject.append('stagingDate',payload.stagingDate);
    }
    if(payload.develDate){
        mobileProject.append('develDate',payload.develDate);
    }
    if(payload.milestone){
        mobileProject.append('milestone',payload.milestone);
    }
    if(payload.appStatus){
        mobileProject.append('appStatus',payload.appStatus);
    }
    if(payload.liveLink){
        mobileProject.append('liveLink',payload.liveLink);
    }
    if(payload.demoLink){
        mobileProject.append('demoLink',payload.demoLink);
    }
    if(payload.stagingLink){
        mobileProject.append('stagingLink',payload.stagingLink);
    }
    if(payload.develLink){
        mobileProject.append('develLink',payload.develLink);
    }
      
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
        commit('setLoading', false);

    })
    .catch((err) => {
        commit('setLoading', false);
    })
  },


  createMobileProject({commit}, payload){
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
            
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
        })
  },

deleteMobileProject({commit, state}, payload){
    commit('setLoading', true);
    const projectID = payload.projectID;
    const specID = payload.specID;
    axios.delete(apiEndpoint + 'mobileProjects/' + projectID)
    .then((response) => {
        // ---------------------------
        axios.delete(apiEndpoint + 'specfiles', {data:{projectID: projectID}})
        .catch((err) => {
            console.log(err)
        })
        // ---------------------------
        if(specID){
            axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/specs/' + specID)
            .catch((err) => {
                console.log(err)
            })
        }
        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/info')
        .catch((err) => {
            console.log(err)
        })

        axios.delete(apiEndpoint + 'mobileProjects/' + projectID + '/storeinfo')
        .catch((err) => {
            console.log(err)
        })
        // ---------------------------
        commit('deletemobileProject', projectID)
        commit('setLoading', false);
    }).catch((err) => {
        commit('setLoading', false);
        console.log(err)
    })
  }
}