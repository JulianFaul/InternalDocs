import axios from 'axios';
import moment from 'moment';
const apiEndpoint = process.env.API_URL;


export default {
  getInternalDocuments({commit}){
    commit('setLoading', true);
    axios.get(apiEndpoint + 'internaldocuments/documents')
        .then((response) => {
            const internalDocuments = [];
            const obj = response.data;
            for(let key in obj){
                internalDocuments.push({
                    id: obj[key]._id,
                    document_type:  obj[key].document_type,
                    title:          obj[key].title,
                    path:           apiEndpoint + obj[key].path,
                    division:       obj[key].division,
                    platform:       obj[key].platform,
                    document_name:  obj[key].document_name,
                    createdAt:      moment(obj[key].createdAt).format('DD/MM/YYYY')
                })
            }
            commit('setInternalDocuments',internalDocuments);
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err);
            commit('setLoading', false);
        })
  },

    uploadInternalDocument({commit},payload){
        let internalDocument = new FormData();
        internalDocument.append('file', payload.file);
        internalDocument.append('title', payload.title);
        internalDocument.append('document_type', payload.document_type);
        internalDocument.append('division', payload.division);
        internalDocument.append('platform', payload.platform);
        commit('setLoading', true);
        axios.post(apiEndpoint + 'internaldocuments/documents', internalDocument)
        .then((response) => {
            commit('createInternalDocument', {
                ...response.data.newDocument,
                id: response.data.newDocument._id
            })
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err)
            commit('setLoading', false);
        })
    },
    
    deleteInternalDocument({commit},payload){
        commit('setLoading', true);
        axios.delete(apiEndpoint + 'internaldocuments/documents/' + payload)
        .then((res) => {
           
            commit('deleteInternalDocument', payload)
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err)
            commit('setLoading', false);
        })
    },


}
