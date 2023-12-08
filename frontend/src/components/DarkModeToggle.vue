<template>
    <button @click="changeTheme()" className="btn-UItheme">
        <span>Change Mode (Light/Dark)</span>
    </button>
</template>

<script>
/**
 * @module DarkModeToggle
 * @description A Vue component that provides a button to toggle between light and dark themes.
 */
export default {
    name: "DarkModeToggle",
    methods: {
        /**
         * @vue-method changeTheme
         * @description Changes the theme of the page between light and dark modes.
         */
        changeTheme() {
            const THEME = document.documentElement.getAttribute("data-theme");
            if (THEME == "dark") {
                localStorage.setItem("theme", "light");
                document.documentElement.setAttribute("data-theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
                document.documentElement.setAttribute("data-theme", "dark");
            }
        },
    },
};
</script>
