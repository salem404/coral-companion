<script>
import Access from "@/components/Access/Access.vue";

export default {
    components: {
        Access,
    },
};
</script>

<template>
    <main class="home">
        <h1 class="home__heading">Coral Companion</h1>
        <Access />
    </main>
</template>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("@/assets/images/homeBackground.png");
    display: flex;
    align-items: center;
    justify-content: space-around;
    &__heading {
        font-size: 6vw;
        max-width: 40%;
        margin: 0;
        color: var(--white);
    }
}
//Mobile
@media only screen and (max-width: 768px) {
    .home {
        flex-direction: column;
        background-image: none;
        justify-content: center;
        &__heading {
            font-size: 10vw;
            padding-bottom: 10vw;
            max-width: 100%;
        }
    }
}
</style>
