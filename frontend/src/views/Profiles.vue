<template>
    <div class="profiles">
        <h1 class="profiles__heading">Select your profile</h1>
        <div class="profiles__container">
            <form>
                <div
                    class="profiles__container__item"
                    v-for="profile in profiles"
                >
                    <input
                        type="radio"
                        id="{{ profile.id }}"
                        name="profileSelection"
                        value="{{profile.id}}}"
                    />
                    <label for="{{ profile.id }}">
                        {{ profile.farmer_name }}
                        <img
                            src="../assets/img/gnome2.png"
                            alt=""
                            style="background-color: ${{ profile.color }}; border-radius: 50%;"
                        />
                    </label>
                </div>
                <div class="profiles__container__item">
                    <router-link to="/settings">
                        <input
                            type="radio"
                            id="new"
                            name="profileSelection"
                            value="new"
                        />
                        <label for="new">
                            <img
                                src="../assets/img/gnome0.png"
                                alt="New"
                                style="
                                    background-color: var(--camel);
                                    border-radius: 50%;
                                "
                            />
                            New
                        </label>
                    </router-link>
                </div>
            </form>
            <div class="profiles__container__links">
                <router-link to="/dashboard" class="profiles__container__btn">
                    Play
                </router-link>
                <router-link to="/" class="profiles__container__btn">
                    a
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from "vue-router";

/**
 * @vue-data {Array} [profiles = []] - Lista de personas
 * @vue-event {Array} fetchProfiles - Llama a la api para adquirir la lista de cultivos
 */
export default {
    name: "Profiles",
    data() {
        return {
            profiles: [],
        };
    },
    async mounted() {
        await this.fetchProfiles();
    },
    methods: {
        async fetchProfiles() {
            // TODO: Fetch with authorization
            const response = await fetch(`${API_URL}/profiles/${id}`, {
                method: "GET",
                headers: { Connection: "Keep-Alive" },
            });
            if (response.ok) {
                const data = await response.json();
                this.profiles = data;
            }
        },
    },
    components: { RouterLink },
};
</script>
<style lang="scss" scoped>
.profiles {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: {
        image: url(/src/assets/img/lightBg2.png);
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
        &__links {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
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
        &__item {
            height: 330px;
        }
        a {
            text-decoration: none;
            color: unset;
        }
        form {
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
            gap: 20px;
            input[type="radio"] {
                /* Add if not using autoprefixer */
                -webkit-appearance: none;
                appearance: none;
                /* For iOS < 15 to remove gradient background */
                background-color: #fff;
                /* Not removed via appearance */
                margin: 0;
                width: 235px;
                height: 311px;
                background-color: transparent;
                border: 1px solid #110300;
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 40px;
                &:checked {
                    background: #d9d9d9;
                    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 40px;
                    border: none;
                }
            }
            label {
                text-decoration: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 235px;
                height: 311px;
                position: relative;
                top: -311px;
                border: none;
                cursor: pointer;
                img {
                    width: 100px;
                    height: 100px;
                }
            }
        }
    }
}
@media (max-width: 1254px) {
    .profiles {
        &__heading {
            //styleName: Mobile/H1;
            font-family: General Sans;
            font-size: 64px;
            font-weight: 400;
            line-height: 86px;
            letter-spacing: 0em;
            text-align: center;
        }
    }
}
</style>
