<template>
    <div class="session__welcome">
        <h3 class="session__subtitle">{{ email }}</h3>
        <picture class="gnome">
            <img src="@/assets/img/gnome1.svg" alt="" />
        </picture>
        <router-link to="/profiles" class="btn"> Start </router-link>
        <p>
            Not you?
            <span class="link" @click="logOut()">Logout</span>
        </p>
    </div>
</template>
<script>
/**
 * @module TheWelcome
 * @vue-component
 * @description {@link module:TheWelcome|TheWelcome} component that represents the welcome screen.
 */
import { mapState, mapMutations } from "vuex";
import apiServiceMixin from "@/services/apiServiceMixin.js";

export default {
    name: "TheWelcome",
    mixins: [apiServiceMixin],
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
        ...mapState(["isLogged", "user"]),
        /**
         * @vue-computed email
         * @description Returns the email of the logged in user, or "Farmer?" if no user is logged in
         * @returns {String} The email of the logged in user or "Farmer?".
         */
        email() {
            return this.isLogged && this.user ? this.user.email : "Farmer?";
        },
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
        ...mapMutations(["changeLoggedState", "changeUser"]),
        /**
         * @vue-method logOut
         * @description Log out the user
         * @async
         * @returns {Promise<void>} A promise that resolves when the user has been logged out
         */
        async logOut() {
            try {
                const response = await this.apiService.logOut();
                localStorage.removeItem("token");
                this.changeLoggedState(false);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // In case the token is invalid
                    localStorage.removeItem("token");
                    this.changeLoggedState(false);
                    console.log("Unauthorized");
                }
                console.log(error);
            }
        },
    },
};
</script>
