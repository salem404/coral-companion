<template>
    <header>
        <DarkModeToggle />
        <router-link v-if="profile" to="/profiles" class="btn-UIswap">
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
         * @vue-computed profile
         * @description Retrieves the profile state from Vuex store
         * @returns {Object} The profile state from Vuex store. This object contains the user's profile information if the user is logged in.
         */
        ...mapState(["profile"]),
    },
};
</script>
