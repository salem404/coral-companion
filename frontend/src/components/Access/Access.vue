<template>
    <div v-if="isLogged" class="access">
        <div class="access__option">Welcome</div>
        <div class="access__welcome">
            <div>
                <p class="access__welcome__user">Username</p>
                <img
                    class="access__welcome__photo"
                    src="/src/assets/img/gnome1.png"
                    alt="Profile picture"
                />
                <router-link to="/profiles" class="access__welcome__btn">
                    Let's go
                </router-link>
            </div>
        </div>
    </div>

    <div v-else class="access">
        <select v-model="selected" class="access__option">
            <option value="">{{ selected ? "Return" : "Click me" }}</option>
            <option value="Login">Login</option>
            <option value="Register">Register</option>
        </select>
        <div v-if="selected === 'Login'">
            <Login />
        </div>
        <div v-else-if="selected === 'Register'">
            <Register />
        </div>
        <div v-else class="access__welcome">
            <div>
                <p>Choose your access method</p>
                <img
                    src="/src/assets/img/logo-color.svg"
                    alt="Coral Companion Logo"
                />
            </div>
        </div>
    </div>
</template>
<script>
import Login from "@/components/Access/Login.vue";
import Register from "@/components/Access/Register.vue";

/**
 * @vue-data {boolean} [isLogged=true] - Estado del login del usuario
 * @vue-data {string} [selected=""] - Opción de acceso seleccionada
 */
export default {
    components: {
        Login,
        Register,
    },
    data() {
        return {
            isLogged: true,
            selected: "",
        };
    },
};
</script>
<style lang="scss">
.access {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    justify-items: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 40%;
    background: rgba(217, 217, 217, 0.83);
    border: 28px solid var(--sapphire);
    border-radius: 40px;
    &__option {
        position: relative;
        top: -1em;
        box-sizing: border-box;
        margin-right: 1em;
        margin-left: 1em;
        padding: 0.1em;
        background: var(--swimmer);
        border: 7px solid var(--sapphire);
        border-radius: 14px;
        font-size: 4em;
        font-family: Quicksand;
        font-weight: 400;
        line-height: 73px;
        color: var(--black);
        text-align: center;
        letter-spacing: 0em;
    }
    &__welcome {
        &__photo {
            background-color: var(--gainsboro);
            // TODO: Change to profile color
            border-radius: 100px;
        }
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-bottom: 100px;
            gap: 10px;
            p {
                font-size: 36px;
                font-family: Quicksand;
                font-weight: 400;
                line-height: 45px;
                text-align: center;
                letter-spacing: 0em;
            }
            img {
                align-self: center;
                margin-bottom: 5px;
            }
        }
        &__user {
            font-size: 2vw;
            text-align: center;
        }
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
//Mobile
@media (max-width: 1254px) {
    .access {
        width: 100%;
        max-height: 70%;
        &__welcome {
            padding: 0;
        }
    }
}
</style>
