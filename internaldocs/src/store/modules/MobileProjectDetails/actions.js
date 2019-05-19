import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
  getAppSpecs({commit}, id){
    commit('setLoading', true);
    axios.get(apiEndpoint + 'mobileProjects/' + id + '/specs')
        .then((response) => {
                let obj = response.data;
                if(obj){
                    let specs = {};
                    let appspecdocs = [];
                    for(var key in obj.appspecdocs){
                        appspecdocs.push({
                            id: obj.appspecdocs[key]._id,
                            createdAt: moment(obj.appspecdocs[key].createdAt).format('DD/MM/YYYY'),
                            header: obj.appspecdocs[key].header,
                            title: obj.appspecdocs[key].documentName,
                            path: obj.appspecdocs[key].path,
                            projectID: obj.appspecdocs[key].projectID,
                            specID: obj.appspecdocs[key].specID,             
                        })
                    }
                specs = {
                    specID:                 obj._id,
                    projectID:              obj.projectID,
                    appspecdocs:            appspecdocs,
                    usedBy:                 obj.usedBy,              
                    devices:                obj.devices,   
                    stores:                 obj.stores,
                    generatedDoc:           obj.generatedDoc,
                    multiPricelist:         obj.multiPricelist,
                    multiPricelistDate:     obj.multiPricelistDate,
                    priceListDetails:       obj.priceListDetails,
                    setStatus:              obj.setStatus,
                    setStatusDate:          obj.setStatusDate,
                    setStatusDetails:       obj.setStatusDetails,
                    maintenanceContactName: obj.maintenanceContactName,
                    maintenanceContactEmail:obj.maintenanceContactEmail,
                    quoteRequestDetails:    obj.quoteRequestDetails,
                    contactMeDetails:       obj.contactMeDetails,
                    specialComments:        obj.specialComments,
                    dueDate:                obj.dueDate
                }
                commit('setAppSpecs', specs);
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
  },

  createAppSpecs({commit}, payload){
    const projectID = payload.projectID;

    let specDetails = {}
        specDetails.usedBy                  = payload.usedBy
        specDetails.devices                 = payload.devices
        specDetails.stores                  = payload.stores
        specDetails.generatedDoc            = payload.generatedDoc
        specDetails.multiPricelist          = payload.multiPricelist
        specDetails.multiPricelistDate      = payload.multiPricelistDate
        specDetails.priceListDetails        = payload.priceListDetails
        specDetails.setStatus               = payload.setStatus
        specDetails.setStatusDate           = payload.setStatusDate
        specDetails.setStatusDetails        = payload.setStatusDetails
        specDetails.maintenanceContactName  = payload.maintenanceContactName
        specDetails.maintenanceContactEmail = payload.maintenanceContactEmail
        specDetails.quoteRequestDetails     = payload.quoteRequestDetails
        specDetails.contactMeDetails        = payload.contactMeDetails
        specDetails.specialComments         = payload.specialComments
        specDetails.dueDate                 = payload.dueDate


    axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/specs', specDetails)
    .then((response) => {
      return response.data._id
    })
    .then((specID) => {
        if(payload.files.length){
            let formData = new FormData();
            for( var i = 0; i < payload.files.length; i++ ){
                let file = payload.files[i];
                formData.set('header[' + i + ']', file.header)
                formData.append('documents', file);
                
            }
            formData.append('projectID', projectID);
            formData.append('specID', specID);
            axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/specfiles', formData)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log("err", err)
            })
        }else{
            console.log("no files")
        }
    })
    .catch((err)=> {
        console.log(err)
    })
  }
}

//'file[' + i + ']'




// getPricelistDocuments({commit}, detailID){
//     axios.get(apiEndpoint + 'details/' + detailID + '/pricelists')
//     .then((response) => {
//         const pricelistDocuments = [];
//         const obj = response.data;
//         for(let key in obj){
//             pricelistDocuments.push({
//                 createdAt: obj[key].createdAt,
//                 detailsID: obj[key].detailsID,
//                 documentName: obj[key].documentName,
//                 path: apiEndpoint + obj[key].path
//             })
//         }
//     })

//   }