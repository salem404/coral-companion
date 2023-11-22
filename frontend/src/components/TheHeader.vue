<template>
    <header>
        <DarkModeToggle />
        <router-link v-if="$parent.isLogged" to="/profile" className="btn-UIswap"> <span>Change Profiles</span>
        </router-link>
    </header>
</template>
<script>
import DarkModeToggle from "@/components/DarkModeToggle.vue";
export default {
    name: "TheHeader",
    components: { DarkModeToggle },
};
</script>
