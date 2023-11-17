<template>
    <header>
        <DarkModeToggle />
        <!-- TODO: Link to profile page -->
        <button type="button" className="btn-UIswap"></button>
    </header>
</template>
<script>
import DarkModeToggle from "@/components/DarkModeToggle.vue";
export default {
    name: "TheHeader",
    components: { DarkModeToggle },
};
</script>
