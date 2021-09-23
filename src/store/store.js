import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        forms: []
    },
    mutations: {
        setFormSend(state, payload) {
            state.forms.push(payload);
        },
    },
    getters: {
        getCart(state){
            return state.cart
        },
        getFormState(state){
            return state.forms
        }
    },
    actions: {
        formSend({commit}, payload){
            commit("setFormSend", payload)
        }
    }
});
