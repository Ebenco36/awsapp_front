import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './modules/currentUser'
import menu from './modules/menu'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      currentUser,
      menu
    }
})
