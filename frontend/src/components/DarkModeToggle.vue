<template>
    <button @click="changeTheme()" className="btn-UItheme">
        <span>Change Mode (Light/Dark)</span>
    </button>
</template>

<script>
/**
 * @vue-method {Function} changeTheme - Cambia el tema de la página
 */
export default {
    name: "DarkModeToggle",
    methods: {
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
