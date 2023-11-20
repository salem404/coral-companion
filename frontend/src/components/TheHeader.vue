<template>
    <header>
        <DarkModeToggle />
        <!-- TODO: Link to profile page ONLY if logged -->
        <router-link to="/profile" className="btn-UIswap"> </router-link>
    </header>
</template>
<script>
import DarkModeToggle from "@/components/DarkModeToggle.vue";
export default {
    name: "TheHeader",
    components: { DarkModeToggle },
};
</script>
