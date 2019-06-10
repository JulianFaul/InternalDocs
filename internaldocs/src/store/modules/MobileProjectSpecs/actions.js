import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
  getAppSpecs({commit}, id){
    commit('setLoading', true);
    let appspecdocs = [];
    axios.get(apiEndpoint + 'mobileProjects/' + id + '/specfiles')
    .then((response) => {
        let obj = response.data;
        console.log(obj)
        for(var key in obj){
            appspecdocs.push({
                id: obj[key]._id,
                createdAt: moment(obj[key].createdAt).format('DD/MM/YYYY'),
                header: obj[key].header,
                filename: obj[key].documentName,
                path: apiEndpoint + obj[key].path,
                projectID: obj[key].projectID,
                specID: obj[key].specID,
                createdBy: obj[key].createdBy,
                history: obj[key].AppSpecDocHistory
            })
        }
        return appspecdocs
    })
    .then((appspecdocs) => {
        axios.get(apiEndpoint + 'mobileProjects/' + id + '/specs')
        .then((response) => {
                let obj = response.data;
                if(obj){
                let specs = {};
                specs = {
                    specID:                 obj._id,
                    projectID:              obj.projectID,
                    appspecdocs:            appspecdocs,
                    usedBy:                 obj.usedBy,              
                    devices:                obj.devices,   
                    stores:                 obj.stores,
                    luxaflex:               obj.luxaflex,
                    taylorBlinds:           obj.taylorBlinds,
                    generatedDoc:           obj.generatedDoc,
                    multiPricelist:         obj.multiPricelist,
                    multiPricelistDate:     obj.multiPricelistDate,
                    priceListDetails:       obj.priceListDetails,
                    setStatus:              obj.setStatus,
                    setStatusDate:          obj.setStatusDate,
                    setStatusDetails:       obj.setStatusDetails,
                    setRepsDate:            obj.setRepsDate,
                    maintenanceContactName: obj.maintenanceContactName,
                    maintenanceContactEmail:obj.maintenanceContactEmail,
                    quoteRequestDetails:    obj.quoteRequestDetails,
                    contactMeDetails:       obj.contactMeDetails,
                    specialComments:        obj.specialComments,
                    dueDate:                obj.dueDate
                }
                commit('setAppSpecs', specs);
                console.log(specs)
                commit('setLoading', false);
            }else{
                let specs = {};
                commit('setAppSpecs', specs);
                commit('setLoading', false);
            }
        })
        .catch((err) => {
            console.log(err);
            commit('setLoading', false);
        })
    })
    .catch((err) => {

    })
    
  },

  createAppSpecs({commit,dispatch}, payload){
    commit('setLoading', true); 
    const projectID = payload.projectID;
    let specDetails = {}
       
        specDetails.usedBy                  = payload.usedBy
        specDetails.devices                 = payload.devices
        specDetails.stores                  = payload.stores
        specDetails.ecommerceDate           = payload.ecommerceDate
        specDetails.ecommerce               = payload.ecommerce
        specDetails.luxaflex                = payload.luxaflex
        specDetails.taylorBlinds            = payload.taylorBlinds
        specDetails.generatedDoc            = payload.generatedDoc
        specDetails.multiPricelist          = payload.multiPricelist
        specDetails.multiPricelistDate      = payload.multiPricelistDate
        specDetails.priceListDetails        = payload.priceListDetails
        specDetails.setStatus               = payload.setStatus
        specDetails.setStatusDate           = payload.setStatusDate
        specDetails.setStatusDetails        = payload.setStatusDetails
        specDetails.setRepsDate             = payload.setRepsDate
        specDetails.maintenanceContactName  = payload.maintenanceContactName
        specDetails.maintenanceContactEmail = payload.maintenanceContactEmail
        specDetails.quoteRequestDetails     = payload.quoteRequestDetails
        specDetails.contactMeDetails        = payload.contactMeDetails
        specDetails.specialComments         = payload.specialComments
        specDetails.dueDate                 = payload.dueDate

    let key
    let appspecdocs = [];

    axios.post(apiEndpoint + 'mobileProjects/'+ projectID +'/specs', specDetails)
    .then((response) => {
        key = response.data._id
      return key
    })
    .then((key) => {
        if(payload.files.length){
            let formData = new FormData();
            for( var i = 0; i < payload.files.length; i++ ){
                let file = payload.files[i];
                formData.set('header[' + i + ']', file.header)
                formData.append('documents', file);
            }
            formData.append('projectID', projectID);
            formData.append('specID', key);
            formData.append('userID', payload.userID);
            formData.append('userName', payload.userName);

         axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/specfiles', formData)
         .then((files) => {
             console.log(files.data)
            const obj = files.data;
            for(var key in obj){
                appspecdocs.push({
                    id: obj[key]._id,
                    createdAt: moment(obj[key].createdAt).format('DD/MM/YYYY'),
                    header: obj[key].header,
                    filename: obj[key].documentName,
                    path: apiEndpoint + obj[key].path,
                    projectID: obj[key].projectID,
                    specID: obj[key].specID,             
                })
            }
            console.log(obj)
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }).then(() => {
        commit('setAppSpecs', {
            specID: key,
            ...specDetails,
            appspecdocs: appspecdocs
        })
        dispatch('getAppSpecs', projectID)
        commit('setLoading', false);
       
    })
    .catch((err)=> {
        commit('setLoading', false);
        console.log(err)
    })
  },

  updateAppSpecs({commit, getters, dispatch}, payload){
    commit('setLoading', true);
    const specID = payload.specID;
    const projectID = payload.projectID;
   
    let specDetails = {}
        specDetails.userID                  = payload.userID
        specDetails.usedBy                  = payload.usedBy
        specDetails.devices                 = payload.devices
        specDetails.stores                  = payload.stores
        specDetails.generatedDoc            = payload.generatedDoc
        specDetails.ecommerceDate           = payload.ecommerceDate
        specDetails.ecommerce               = payload.ecommerce
        specDetails.luxaflex                = payload.luxaflex
        specDetails.taylorBlinds            = payload.taylorBlinds
        specDetails.multiPricelist          = payload.multiPricelist
        specDetails.multiPricelistDate      = payload.multiPricelistDate
        specDetails.priceListDetails        = payload.priceListDetails
        specDetails.setStatus               = payload.setStatus
        specDetails.setStatusDate           = payload.setStatusDate
        specDetails.setStatusDetails        = payload.setStatusDetails
        specDetails.setRepsDate             = payload.setRepsDate
        specDetails.maintenanceContactName  = payload.maintenanceContactName
        specDetails.maintenanceContactEmail = payload.maintenanceContactEmail
        specDetails.quoteRequestDetails     = payload.quoteRequestDetails
        specDetails.contactMeDetails        = payload.contactMeDetails
        specDetails.specialComments         = payload.specialComments
        specDetails.dueDate                 = payload.dueDate
    let key
    let appspecdocs = getters.loadedAppSpecs.appspecdocs;

    axios.put(apiEndpoint + 'mobileProjects/'+ projectID +'/specs/'+ specID, specDetails)
    .then((response) => {
        key = response.data._id
      return key
    })
    .then((key) => {
        if(payload.files.length){
            let formData = new FormData();
            for( var i = 0; i < payload.files.length; i++ ){
                let file = payload.files[i];
                formData.set('header[' + i + ']', file.header)
                formData.append('documents', file);
            }
            formData.append('projectID', projectID);
            formData.append('specID', key);
            formData.append('userID',payload.userID);
            formData.append('userName', payload.userName);
         axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/specfiles', formData)
         .then((files) => {
            const obj = files.data;
            for(var key in obj){
                appspecdocs.push({
                    id: obj[key]._id,
                    createdAt: moment(obj[key].createdAt).format('DD/MM/YYYY'),
                    header: obj[key].header,
                    filename: obj[key].documentName,
                    path: apiEndpoint + obj[key].path,
                    projectID: obj[key].projectID,
                    specID: obj[key].specID,             
                })
            }
            dispatch('getAppSpecs', projectID)
        })
        .catch((err) => {
            console.log(err)
        })
        }
    }).then(() => {
        commit('updateAppSpecs', {
            specID: specID,
            ...specDetails,
            appspecdocs: appspecdocs
        })
        dispatch('getAppSpecs', projectID)
        commit('setLoading', false);
       
    })
    .catch((err)=> {
        commit('setLoading', false);
        console.log(err)
    })
  },

  deleteDocument({commit,dispatch}, docID){
    commit('setLoading', true);
        axios.delete(apiEndpoint + 'specfiles/' + docID)
        .then((response) => {
            commit('deleteAppSpecDoc', docID);
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
  },

  updateSpecDocument({commit, dispatch}, payload){
      let formData = new FormData();
      formData.append('file', payload.specDoc);
      formData.append('userID',payload.userID);
      formData.append('userName', payload.userName);
      axios.put(apiEndpoint + 'specfiles/' + payload.specDocID, formData)
      .then((response) => {
        dispatch('getAppSpecs', payload.projectID)
      })
      .catch((err) => {
          console.log(err)
      })
  }


}