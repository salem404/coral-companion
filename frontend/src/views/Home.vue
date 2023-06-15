<template>
    <div class="home">
        <h1 class="home__heading">Coral Companion</h1>
        <Access />
    </div>
</template>

<script>
import Access from "@/components/Access/Access.vue";

export default {
    components: {
        Access,
    },
};
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    gap: 69px;
    width: 100%;
    height: 100%;
    background: {
        image: url(/src/assets/img/lightBg.png);
        repeat: no-repeat;
        size: cover;
        position: center;
    }

    &__heading {
        width: 684px;
        height: 332px;
        font-size: 128px;
        font-family: General Sans;
        font-weight: 400;
        line-height: 173px;
        color: var(--gainsboro);
        text-align: left;
        letter-spacing: 0em;
    }
}
@media (max-width: 1254px) {
    .home {
        background: {
            image: url(/src/assets/img/lightBgMb.png);
            size: cover;
            repeat: no-repeat;
            position: top;
        }
        align-items: center;
        &__heading {
            height: 166px;
            font-size: 64px;
            text-align: center;
            margin: 0;
        }
    }
}
</style>
