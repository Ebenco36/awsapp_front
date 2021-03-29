import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import About from '../views/About.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/auth/Register.vue'
Vue.use(VueRouter)

const routerOptions = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('@/layouts/Layout'),
    children: [
      { path: '/home', component: Home},
      { path: '/about', component: About},
      { path: '/profile', component: Profile}
    ]
  }, { path: '/login', component: Login },
  { path: '/register', component: Register },
]
const routes = routerOptions

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
