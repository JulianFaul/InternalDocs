import axios from 'axios';
const apiEndpoint = process.env.API_URL;


export default {
    getUsers({commit}, payload){
        commit('setLoading', true);
        axios.get(apiEndpoint + "user")
        .then((response) => {
            console.log(response)
            let obj = response.data
            let users = [];
            for(let key in obj){
                users.push({
                    id:         obj[key]._id,
                    email:      obj[key].email,
                    userName:   obj[key].userName,
                    lastname:   obj[key].lastname,
                    department: obj[key].department,
                    role:       obj[key].role
                })
            }
            commit('setUsers', users);
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
            console.log(err)
        })
    },
    
    logUserIn({commit}, payload) {
        axios.post(apiEndpoint + "login", payload)
        .then((response) => {
            const newUser = {
                id: response.data._id,
                userName: response.data.userName,
                lastname: response.data.lastname,
                department: response.data.department,
                role: response.data.role,
                email: response.data.email
            }
            commit('setUser', newUser);
            commit('setLoading', false);
        })
        .catch((err) => {
            console.log(err)
        })
    },

    logUserOut({commit}){
        commit('setUser', null);
    },

    createUser({commit}, payload){
        commit('setLoading', true);
        axios.post(apiEndpoint + "user", payload)
        .then((response) => {
            commit('addUser', {
                id:         response.data._id,
                email:      payload.email,
                userName:   payload.userName,
                lastname:   payload.lastname,
                department: payload.department,
                role:       payload.role
            });
            commit('setLoading', false);
        })
        .catch((err) => {
            commit('setLoading', false);
            commit('snackbar',{show: true,color:'red', message: err.response.data.message});
            console.log(err.response.data.message)
        })
    },

    deleteUser({commit}, payload){
        commit('setLoading', true);
        axios.delete(apiEndpoint + "user/" + payload)
        .then((response) => {
            commit('setLoading', false);
            commit('deleteUser', payload);
            commit('snackbar',{show: true,color:'red', message: response.data.message});
        })
        .catch((err) => {
            commit('setLoading', false);
            commit('snackbar',{show: true,color:'red', message: err.response.data.message});
            console.log(err.response.data.message)
        })
    }
}