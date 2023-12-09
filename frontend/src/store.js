/**
 * Vuex store module.
 * @module store
 */

import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

/**
 * Vuex store.
 * @name store
 * @type {Object}
 * @property {Object} state - The state of the store
 * @property {boolean} state.isLogged - Indicates whether the user is logged in
 * @property {Object} state.user - The user object
 * @property {Object} state.profile - The profile object
 * @property {Object} mutations - The mutations of the store
 * @property {function} mutations.changeLoggedState - Change the logged state
 * @property {function} mutations.changeUser - Change the user
 * @property {function} mutations.changeProfile - Change the profile
 */
export default createStore({
    plugins: [createPersistedState()],
    state: {
        isLogged: false,
        user: null,
        profile: null,
    },
    mutations: {
        changeLoggedState(state, value) {
            state.isLogged = value;
        },
        changeUser(state, user) {
            state.user = user;
        },
        changeProfile(state, profile) {
            state.profile = profile;
        },
    },
});
