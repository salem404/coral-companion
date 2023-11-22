<template>
    <TheHeader />
    <router-view> </router-view>
    <TheFooter />
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import apiService from "@/services/api";

export default {
    name: "App",
    components: { TheHeader, TheFooter },
    data() {
        return {
            apiService: new apiService(),
            isLogged: false,
        };
    },
    methods: {

        // TODO: Add a method to check if the user is logged in
        changeLoggedState() {
            this.isLogged = !this.isLogged;
        },
    },
    mounted() {

        // THEME
        const hasDarkPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
