<template>
    <TheHeader />
    <router-view> </router-view>
    <TheFooter />
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { mapState, mapMutations } from "vuex";
import apiService from "@/services/api.js";

export default {
    name: "App",
    components: { TheHeader, TheFooter },
    computed: {
        ...mapState(["isLogged", "user"]),
    },
    methods: {
        ...mapMutations(["changeLoggedState", "changeUser"]),
        async checkToken() {
            try {
                const response = await this.apiService.checkToken();
                console.log(response);
                this.changeLoggedState(true);
                this.changeUser(response.data.user);
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
    data() {
        return {
            apiService: null,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    mounted() {
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
