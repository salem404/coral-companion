<template>
    <div class="settings">
        <!-- Component 4 content here -->
    </div>
</template>

<script>
export default {
    name: "Settings",
};
</script>

<style>
.settings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: slide-from-top 0.5s;
}

@keyframes slide-from-top {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
