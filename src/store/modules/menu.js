import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: '#031e36',
    SidebarBg: ''
  }
const mutations = {
    SET_SIDEBAR_DRAWER (state, payload) {
        state.Sidebar_drawer = payload
    },
    SET_CUSTOMIZER_DRAWER (state, payload) {
        state.Customizer_drawer = payload
    },
    SET_SIDEBAR_COLOR (state, payload) {
        state.SidebarColor = payload
    }, 
}
const actions = {

}
const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}