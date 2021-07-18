import axios from 'axios';
import * as store from "store2";

console.log(store.get("auth"));
export const HTTP = axios.create({
	baseURL: `be.zerops/v1`
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
		console.log(response);
		if (response.status === 401) {
			console.log("Error 401");
			if (this.$router.currentRoute.path !== "/login") {
				this.$router.push("/login");
			}
		}
		return response;
	},
	(error) => {
		console.log(error);
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
