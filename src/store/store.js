import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        dialog: false,
        boxesWithAccess: [],
        delivery: { deliveryId: "", phone: "", boxId: "", boxName: "" },
        boxContent: [],
    },
    mutations: {
        openClearDialog(state, payload) {
            state.dialog = payload.open;
            state.delivery.boxId = "";
            state.delivery.boxName = "";
        },
        openDialog(state, payload) {
            state.dialog = payload.open;
            state.delivery.boxId = payload.boxId;
            state.delivery.boxName = payload.boxName;
        },
        changeDeliveryID(state, payload) {
            state.delivery.deliveryId = payload.deliveryId;
        },
        changePhoneNumber(state, payload) {
            state.delivery.phone = payload.phone;
        },
        addAccessibleBox(state, box) {
            state.boxesWithAccess.push(box);
        },
        setBoxContent(state, content) {
            console.log(content);
            Vue.set(state, 'boxContent', [...content]);
        },
        pushNewBoxContent(state, content) {
            Vue.set(state, 'boxContent', state.boxContent.push([...content]));
        }
    },
    getters: {
        dialog: state => state.dialog,
        boxId: state => state.delivery.boxId,
        delivery: state => state.delivery,
        boxesWithAccess: state => state.boxesWithAccess,
        boxContent: state => state.boxContent,
    }
});
