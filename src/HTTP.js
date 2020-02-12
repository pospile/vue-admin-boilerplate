import axios from 'axios';
import * as store from "store2";

export const HTTP = axios.create({
    baseURL: `/`,
    headers: {
        Authorization: `Bearer ${(store.get("auth")) ? store.get("auth").token : undefined}`
    }
});
