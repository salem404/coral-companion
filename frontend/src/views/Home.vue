<script>
import Access from "@/components/Access/Access.vue";

export default {
    components: {
        Access,
    },
};
</script>

<template>
    <transition name="slide-left">
        <div class="home">
            <h1 class="home__heading">Coral Companion</h1>
            <Access />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.home {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    gap: 69px;
    background: {
        image: url(/src/assets/img/lightBg.png);
        position: center;
        repeat: no-repeat;
        size: cover;
    }

    &__heading {
        font-family: General Sans;
        font-size: 128px;
        font-weight: 400;
        line-height: 173px;
        letter-spacing: 0em;
        text-align: left;
        color: var(--white);
        width: 684px;
        height: 332px;
    }
}
@media (max-width: 1200px) {
    .home {
        background: {
            image: url(/src/assets/img/lightBgMb.png);
            position: top;
            size: cover;
            repeat: no-repeat;
        }
    }

    .home {
        align-items: center;
        &__heading {
            text-align: center;
            font-size: 64px;
            line-height: 86px;
            height: 166px;
        }
    }
}
</style>
