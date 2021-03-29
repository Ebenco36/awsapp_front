import Axios from 'axios'
import router from '../../router'
const state = {
    user: '',
    token: '',
    loginTrue: false,
    error: ''
}
const mutations = {
    setUser (state, payload) {
        state.user = payload
        localStorage.setItem('data', payload)
    },
    unsetError (state) {
        state.error = ""
    }
}
const actions = {
    loginUser ({state, commit}, user) {
        commit('unsetError')
        let formData = new FormData();
        formData.append('email', user.email)
        formData.append('password', user.password)
        console.log(formData)
        Axios.post('/login',formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
            console.log(response.data)
            if (response.data.status == true) {
                state.loginTrue = true
                state.token = response.data.token
                commit('setUser', response.data.user)
                commit('unsetError')
                // console.log(state.user)
                localStorage.setItem('user', response.data.user.name + '(' + response.data.user.email + ')')
                localStorage.setItem('id_token', state.token)
                router.push('/')
            } else {
                state.error = response.data.message ? response.data.message : 'Invalid login'
                state.loginTrue = false
            }
        })
        .catch(error => {
            state.error = error
            state.loginTrue = false
        })
    },
    setUserData ({commit}, user) {
        commit('setUser', user)
    },
}

const getters = {
        /*
        getUsersNow(state){
            return state.users
        }
        */
        getUsersNow: (state) => state.user,
        getToken: (state) => state.token,
        getLoginTrue: (state) => state.loginTrue

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
