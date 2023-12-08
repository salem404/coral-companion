<template>
    <TheHeader />
    <router-view> </router-view>
    <TheFooter />
</template>
<script>
/**
 * @module App
 * @vue-component
 * @description {@link module:App|App} component that represents the main application.
 */
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapState, mapMutations } from "vuex";
import apiServiceMixin from "@/services/apiServiceMixin.js";

export default {
    name: "App",
    mixins: [apiServiceMixin],
    components: {
        /**
         * @vue-component TheHeader
         * @description {@link module:TheHeader|TheHeader} component used in this component
         */
        TheHeader,
        /**
         * @vue-component TheFooter
         * @description {@link module:TheFooter|TheFooter} component used in this component
         */
        TheFooter,
    },
    computed: {
        /**
         * @vue-computed isLogged
         * @description Indicates whether the user is logged in
         * @returns {Boolean} The Vuex state.
         */
        /**
         * @vue-computed user
         * @description The logged in user
         * @returns {Object} The Vuex state.
         */
        /**
         * @vue-computed profile
         * @description The profile of the logged in user
         * @returns {Object} The Vuex state.
         */
        ...mapState(["isLogged", "user", "profile"]),
    },
    methods: {
        /**
         * @vue-method changeLoggedState
         * @description Change the logged state
         */
        /**
         * @vue-method changeUser
         * @description Change the user
         */
        /**
         * @vue-method changeProfile
         * @description Change the profile
         */
        ...mapMutations(["changeLoggedState", "changeUser", "changeProfile"]),
        /**
         * @vue-method checkToken
         * @description Check the token validity
         * @async
         * @returns {Promise<void>} A promise that resolves when the token has been checked
         */
        async checkToken() {
            try {
                const response = await this.apiService.checkToken();
                this.changeLoggedState(true);
                this.changeUser(response.data.user);
                if (response?.data?.user?.profiles?.length > 0) {
                    this.changeProfile(response.data.user.profiles[0]);
                }
            } catch (error) {
                if (error.response.status === 401) {
                    // In case the token is invalid
                    localStorage.removeItem("token");
                    this.changeLoggedState(false);
                    console.log("Unauthorized");
                }
                console.log(error);
            }
        },
    },
    /**
     * @vue-lifecycle mounted
     * @description Vue.js lifecycle hook that is called after the instance has been mounted. Checks for a token in local storage and sets the theme based on user preference or local storage
     */
    mounted() {
        // TOKEN
        const TOKEN = localStorage.getItem("token");
        if (TOKEN != null) {
            this.checkToken();
        }
        // THEME
        const hasDarkPreference = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        const THEME = localStorage.getItem("theme");
        if (THEME == null) {
            if (hasDarkPreference) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        } else if (THEME == "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    },
};
</script>
<style src="./assets/scss/main.scss"></style>
