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
                    specID: obj._id,
                    label: obj.title,
                    projectID: obj.projectID,
                    appspecdocs: appspecdocs
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

    axios.post(apiEndpoint + 'mobileProjects/' + projectID + '/specs', {title: 'hi'})
    .then((response) => {
        
      return response.data._id
    })
    .then((specID) => {
        console.log(specID)
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
                console.log('im here', response)
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