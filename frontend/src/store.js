import { createStore } from "vuex";

export default createStore({
    state: {
        isLogged: false,
        user: null,
        profile: null,
    },
    mutations: {
        changeLoggedState(state) {
            state.isLogged = !state.isLogged;
        },
        changeUser(state, user) {
            state.user = user;
        },
        changeProfile(state, profile) {
            state.profile = profile;
        },
    },
});
