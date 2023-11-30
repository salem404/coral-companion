import { createStore } from "vuex";

export default createStore({
    state: {
        isLogged: false,
    },
    mutations: {
        changeLoggedState(state) {
            state.isLogged = !state.isLogged;
        },
    },
});
