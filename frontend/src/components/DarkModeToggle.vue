<template>
    <button
        @click="changeTheme()"
        className="btn-UItheme"
        aria-label="Change Mode (Light/Dark)"
    ></button>
</template>

<script>
export default {
    name: "DarkModeToggle",
    methods: {
        changeTheme() {
            const THEME = document.documentElement.getAttribute("data-theme");
            if (THEME == "dark") {
                document.documentElement.setAttribute("data-theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
            }
        },
    },
};
</script>
