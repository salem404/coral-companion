<template>
    <div class="home">
        <div id="wave1"></div>
        <div id="wave2"></div>
        <h1 class="home__heading">Coral Companion</h1>
    </div>
</template>

<style lang="scss" scoped>
@-webkit-keyframes MoveUpDown {
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(10px);
    }
    0% {
        transform: translateY(0);
    }
}

@keyframes MoveUpDown {
    100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(10px);
    }
    0% {
        transform: translateY(0);
    }
}

#wave1 {
    -webkit-animation: MoveUpDown 5s linear infinite;
    animation: MoveUpDown 5s linear infinite;
    background-image: url("@/assets/img/wave1.svg");
    background-position: bottom center;
}

#wave2 {
    -webkit-animation: MoveUpDown 4s infinite linear;
    animation: MoveUpDown 4s infinite linear;
    background-image: url("@/assets/img/wave2.svg");
    background-position: bottom;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

#wave1,
#wave2 {
    position: fixed;
    height: 100%;
    width: 100%;
    background-repeat: repeat-x;
    z-index: -1;
}
.home {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    gap: 69px;
    width: 100%;
    height: -webkit-fill-available;

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
        height: 100vh;
        padding: 40px 0;
        align-items: center;
        gap: 0;
        &__heading {
            height: 166px;
            line-height: 64px;
            font-size: 64px;
            text-align: center;
            margin: 0;
        }
    }
}
</style>
