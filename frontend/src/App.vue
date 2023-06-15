<template>
    <button class="theme"></button>
    <router-view> </router-view>
    <button v-if="isLogged" class="logout"></button>
    <a class="github" href="https://github.com/salem404/coral-companion"></a>
</template>
<script>
export default {
    name: "App",
    data() {
        return {
            theme: "light",
            isLogged: false,
        };
    },
    methods: {
        changeTheme() {
            this.theme = this.theme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", this.theme);
        },
    },
};
</script>
<style src="./assets/scss/main.scss"></style>
