<template>
    <div class="mode-toggle">
        <input type="checkbox" id="darkmode-toggle" />
        <label class="darkmode-toggle" for="darkmode-toggle">
            <img class="sun" src="data:image/png;base64,..." />
            <img class="moon" src="data:image/png;base64,..." />
        </label>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        // identify the toggle switch HTML element
        const toggleSwitch =
            document.querySelector <
            HTMLInputElement >
            'input#darkmode-toggle[type="checkbox"]';

        // listener for changing themes
        toggleSwitch?.addEventListener("change", (e) => {
            this.switchTheme(e);
        });

        // get the localStorage theme value if it exists set the theme to the value
        const currentTheme = localStorage.getItem("theme")
            ? localStorage.getItem("theme")
            : null;
        currentTheme &&
            document.documentElement.setAttribute("data-theme", currentTheme);

        // pre-check the dark-theme checkbox if dark-theme is set
        if (document.documentElement.getAttribute("data-theme") == "dark") {
            toggleSwitch && toggleSwitch.checked;
        }
    },

    methods: {
        // function that changes the theme, and sets a localStorage variable to track the theme between page loads javascript
        switchTheme(e) {
            if (e.target instanceof HTMLInputElement) {
                if (e.target.checked) {
                    document.documentElement.setAttribute("data-theme", "dark");
                    localStorage.setItem("theme", "dark");
                } else {
                    document.documentElement.setAttribute(
                        "data-theme",
                        "light",
                    );
                    localStorage.setItem("theme", "light");
                }
            }
        },
    },
};
</script>
