<template>
    <header>
        <DarkModeToggle />
        <router-link v-if="isLogged" to="/profiles" class="btn-UIswap">
            <span>Change Profiles</span>
        </router-link>
    </header>
</template>

<script>
/**
 * @module TheHeader
 * @vue-component
 * @description {@link module:TheHeader|TheHeader} component that represents the header of the page.
 */
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import { mapState } from "vuex";

export default {
    name: "TheHeader",
    components: {
        /**
         * @vue-component DarkModeToggle
         * @description {@link module:DarkModeToggle|DarkModeToggle} component used in this component
         */
        DarkModeToggle,
    },
    computed: {
        /**
         * @vue-computed isLogged
         * @description Indicates whether the user is logged in
         * @returns {Boolean} The Vuex state.
         */
        ...mapState(["isLogged"]),
    },
};
</script>
