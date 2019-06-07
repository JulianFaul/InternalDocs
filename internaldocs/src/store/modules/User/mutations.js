export default {
    setUsers(state, payload) {
        state.users = payload
      },
    setUser(state, payload){
        state.user = payload
    },
    addUser(state, payload){
        state.users.push(payload)
    },
    deleteUser(state, payload){
        let users = state.users;
        users.splice(users.findIndex(currentUsers => currentUsers.id === payload), 1)
    }
}