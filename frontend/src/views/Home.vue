<template>
    <svg
        class="wave-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1500 500"
        width="100%"
        height="100%"
    >
        <path
            d="M163 0.933325C55.3245 6.85562 0 30.6025 0 30.6025V1223.5H1512V30.6025C1406.9 74.3364 1167.26 168 1049.5 192.782C931.734 217.565 815.365 182.456 771.901 161.804C771.901 161.804 578.909 88.0116 483.5 52.9334C388.091 17.8551 270.675 -4.98897 163 0.933325Z"
            fill="currentColor"
        />
    </svg>
    <svg
        class="wave-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 1500 500"
        width="100%"
        height="100%"
    >
        <path
            d="M1349 0.933325C1456.68 6.85562 1512 30.6025 1512 30.6025V1125.5H0L0 30.6025C105.101 74.3364 344.743 168 462.505 192.782C580.266 217.565 696.635 182.456 740.099 161.804C740.099 161.804 933.091 88.0116 1028.5 52.9334C1123.91 17.8551 1241.32 -4.98897 1349 0.933325Z"
            fill="currentColor"
        />
    </svg>
    <main class="home">
        <h1 class="title1">Coral Companion</h1>
        <section class="session">
            <div v-if="isLogged">
                <h2 class="session__title">Welcome</h2>
                <TheWelcome />
            </div>
            <div v-else>
                <h2 class="session__title">
                    {{ title }}
                </h2>
                <FormLogin v-if="title == 'Login'" />
                <FormRegister v-else-if="title == 'Register'" />
            </div>
        </section>
    </main>
</template>
<script>
/**
 * @module Home
 * @description Vue component that represents the home page of the application.
 */
import FormLogin from "@/components/FormLogin.vue";
import FormRegister from "@/components/FormRegister.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import { mapState, mapMutations } from "vuex";
import apiServiceMixin from "@/services/apiServiceMixin.js";

export default {
    name: "Home",
    mixins: [apiServiceMixin],
    components: {
        FormLogin,
        FormRegister,
        TheWelcome,
    },
    computed: {
        /**
         * @vue-computed isLogged
         * @description Indicates whether the user is logged in
         * @returns {Boolean} The Vuex state.
         */
        ...mapState(["isLogged"]),
    },
    data() {
        /**
         * @vue-data title
         * @description The title of the page
         * @returns {String} The title of the page
         */
        return {
            title: "Login",
        };
    },
    mounted() {
        /**
         * @vue-lifecycle mounted
         * @description Checks if the user is logged in and changes the title to "Welcome" if true
         */
        if (this.isLogged) {
            this.changeTitle("Welcome");
        }
    },
    methods: {
        /**
         * @vue-method changeLoggedState
         * @description Change the logged state
         */
        ...mapMutations(["changeLoggedState"]),
        /**
         * @vue-method changeTitle
         * @description Change the title of the page
         * @param {String} newTitle - The new title
         */
        changeTitle(newTitle) {
            this.title = newTitle;
        },
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
                this.changeTitle("Login");
                console.log(response);
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
