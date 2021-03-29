import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './plugins/base'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import VMdDateRangePicker from "v-md-date-range-picker"
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Export Data
import JsonCSV from 'vue-json-csv'
import JsonExcel from "vue-json-excel"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin

//Chart Import 
Vue.use(VueChartkick, { adapter: Chart });


Vue.use(IconsPlugin)
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  };
Vue.use(VueSweetalert2, options)

Vue.component("downloadExcel", JsonExcel)
Vue.component('downloadCsv', JsonCSV)

Vue.use(VMdDateRangePicker)
// ********************************************************************************
// ********************************************************************************
let domain = window.location.hostname
let _baseURL = ''
let _imageURL = ''

// Configuration
if (domain === 'localhost') {
	// RADE Localhost//
	_baseURL = 'http://localhost:8000/api/v1/'
	_imageURL = 'https://s3.aws'
} else if (domain === 'devadmin.esarcar.com') {
	// DEV
	_baseURL = 'http://devadmin.esarcar.com/api/api/'
	_imageURL = 'https://s3.aws/'
} else if (domain === 'admin.esarcar.com') {
	// LIVE nova verzija:
	_baseURL = 'http://admin-api.esarcar.com/api/'
	_imageURL = 'https://s3.aws/'
}

Vue.use(VueAxios, axios)
axios.defaults.baseURL = _baseURL
// base url for images
const imageUrl = {
	install (Vue) {
		Vue.prototype.$imageURL = _imageURL
	}
}
Vue.use(imageUrl)
Vue.prototype.$bus = new Vue()


Vue.use(vuetify, {
    theme: {
        themes: {
            light: {
                primary: "#101820",
                secondary: "#A5D6A7",
                accent: "#616161",
                error: "#f44336",
                warning: "#ffeb3b",
                info: "#101820",
                success: "#4caf50"
            },
            dark: {
                primary: "#101820",
                secondary: "#A5D6A7",
                accent: "#616161",
                error: "#f44336",
                warning: "#ffeb3b",
                info: "#101820",
                success: "#4caf50"
            }
        }
    },
    icons: {
        iconfont: 'md', // default - only for display purposes
    }
})

Vue.config.productionTip = false
router.beforeResolve((to, from, next) => {
    const authUser = localStorage.getItem('id_token')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!authUser) {
            next({
                path: '/login'
            })
		}
    }
    window.scrollTo(0, 0)
    next()
})


Vue.config.productionTip = false


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
