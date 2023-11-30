<template>
    <header>
        <DarkModeToggle />
        <router-link v-if="isLogged" to="/profile" class="btn-UIswap">
            <span>Change Profiles</span>
        </router-link>
    </header>
</template>
<script>
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import { mapState } from "vuex";
export default {
    name: "TheHeader",
    components: { DarkModeToggle },
    computed: {
        ...mapState(["isLogged"]),
    },
};
</script>
