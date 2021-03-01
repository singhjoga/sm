import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import CustomerView from '../views/CustomerView.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CustomerView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/customer',
    name: 'customer',
    component: CustomerView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/sysadmin',
    name: 'sysadmin',
    component: AdminView,
    meta: {
      requiresAuth: true,
      isAdmin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
         // const user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.isAdmin)) {
              next()
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'customer'})
      }
  }else {
      next()
  }
})

export default router
