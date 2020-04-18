import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import * as store from "store2";

Vue.use(VueRouter);



const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/user',
    name: 'Users crud',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersCRUD.vue')
  },
  {
    path: '/company',
    name: 'Company crud',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CompanyCRUD.vue')
  },
  {
    path: '/box',
    name: 'Box crud',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/BoxCRUD.vue')
  },
  {
    path: '/company/admin',
    name: 'Company boxes administration',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/CompanyAdministration.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      requiresAuth: false
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
];

const router = new VueRouter({
  routes
});


// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.get("auth")) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
