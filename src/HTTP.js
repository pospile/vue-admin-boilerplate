import axios from 'axios';
import * as store from "store2";
import router from './router'

console.log(store.get("auth"));
export const HTTP = axios.create({
	baseURL: `https://be-2002f-3001.app.zerops.io/v1`
});
HTTP.interceptors.request.use((config) => {
	try {
		if (JSON.parse(window.localStorage.auth).token) {
			config.headers.Authorization = `Bearer ${JSON.parse(window.localStorage.auth).token}`;
		}
		return config;
	} catch (e) {
		return config;
	}
});

HTTP.interceptors.response.use((response) => {
		return response;
	},
	(error) => {
		console.log(error);
		console.log(error.response);
		if (error.response.status === 401) {
			if (router.currentRoute.path !== "/login") {
				router.push("/login");
			}
		}
		return error;
	});

export default {
	getAuthorizationToken() {
		if (JSON.parse(window.localStorage.auth).token) {
			return JSON.parse(window.localStorage.auth).token;
		} else {
			return false;
		}
	}
}
