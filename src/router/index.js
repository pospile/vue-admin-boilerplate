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
		path: '/bets',
		name: 'BETS crud',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "about" */ '../views/Bets.vue')
	},
	{
		path: '/bet/:betId',
		name: 'Bet resolve',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "about" */ '../views/BetResolve.vue')
	},
	{
		path: '/resolution',
		name: 'Resolution centre',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "about" */ '../views/Resolution.vue')
	},
	{
		path: '/category',
		name: 'Categories',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
	},
	{
		path: '/coupon',
		name: 'Coupon',
		meta: {
			requiresAuth: true
		},
		component: () => import(/* webpackChunkName: "about" */ '../views/Coupouns.vue')
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
			next({name: 'Login'})
		} else {
			next()
		}
	} else {
		next()
	}
});

export default router
