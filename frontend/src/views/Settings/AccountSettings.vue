<template>
    <div class="settings">
        <h1 class="settings__heading">Account</h1>
        <div class="settings__container">
            <form></form>
            <router-link to="/" class="profiles__container__btn">
                aa
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "AccountSettings",
};
</script>

<style lang="scss">
.settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: {
        color: var(--swimmer);
        repeat: no-repeat;
        size: cover;
        position: center;
    }
    &__heading {
        font-family: General Sans;
        font-size: 128px;
        font-weight: 400;
        letter-spacing: 0em;
        text-align: center;
        margin: 0 0 10px 0;
    }
    &__container {
        background: rgba(217, 217, 217, 0.83);
        border: 14px solid #135c7d;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        padding: 40px;
        margin: 0 108px;
        &__btn {
            padding: 10px;
            transition: 120ms;
            cursor: pointer;
            color: var(--black);
            text-decoration: none;
            &:hover {
                box-shadow: 0px 6px 4px 0 rgba(0, 0, 0, 0.108);
                transform: translateY(-2px);
            }
            &:active {
                box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, 0.108);
                transform: translateY(2px);
            }
            font-family: Quicksand;
            font-size: 48px;
            font-weight: 600;
            line-height: 60px;
            letter-spacing: 0em;
            text-align: center;
            background: var(--green);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 35px;
            width: 262px;
            height: 65px;
        }
    }
}
</style>
