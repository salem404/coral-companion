<template>
    <div class="profiles">
        <h1 class="profiles__heading">Profile select</h1>
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
                        required
                    />
                    <label for="{{ profile.id }}">
                        <img
                            src="../assets/img/gnome2.png"
                            alt=""
                            style="background-color: ${{ profile.color }}; border-radius: 50%;"
                        />
                        {{ profile.farmer_name }}
                        <p>
                            {{ profile.farm_name }}
                        </p>
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
                <router-link to="/settings" class="profiles__container__btn">
                    Settings
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { RouterLink } from "vue-router";
import apiService from "@/services/api.js";
import { mapMutations, mapState } from "vuex";

/**
 * @vue-data {Array} [profiles = []] - Lista de personas
 * @vue-event {Array} fetchProfiles - Llama a la api para adquirir la lista de cultivos
 */
export default {
    name: "Profiles",
    components: {
        RouterLink,
    },
    computed: {
        ...mapState(["isLogged", "user", "profile"]),
        id() {
            return this.isLogged && this.$store.state.user
                ? this.$store.state.user.id
                : "0";
        },
    },
    data() {
        return {
            profiles: [],
            apiService: null,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    async mounted() {
        await this.fetchProfiles();
    },
    methods: {
        ...mapMutations(["changeProfile"]),
        async fetchProfiles() {
            // TODO: Fetch with authorization
            const response = await fetch(
                `http://localhost/api/user/${this.id}/profiles`,
                {
                    method: "GET",
                    headers: { Connection: "Keep-Alive" },
                },
            );
            if (response.ok) {
                const data = await response.json();
                this.profiles = data;
                console.log(data[0]);
                this.changeProfile(data[0]);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.profiles {
    display: flex;
    width: 100%;
    height: 100%;
    padding: var(--espaciado-mobile-80, 7px) 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--espaciado-desktop-100, 28px);
    flex-shrink: 0;
    &__heading {
        color: var(--text-primary, #110300);

        /* PC/Title2 */
        font-family: General Sans;
        font-size: 72px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    &__container {
        background: rgba(217, 217, 217, 0.83);
        border: 14px solid #135c7d;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        padding: 40px;
        width: 100%;
        border-radius: var(--radio, 40px);
        border-top: 28px solid var(--borde-borde, #135c7d);
        border-right: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        border-bottom: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        border-left: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        background: var(--fondo-transparente, rgba(217, 217, 217, 0.82));

        /* Dark */
        box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.65);
        &__links {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }
        &__btn {
            padding: 10px;
            transition: 120ms;
            cursor: pointer;
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

            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 35px;
            width: 262px;
            height: 65px;
            display: flex;
            width: 300px;
            padding: var(--button-vertical-padding, 12px)
                var(--button-horizontal-padding, 63px);
            justify-content: center;
            align-items: center;
            border-radius: var(--button-radio, 40px);
            background: var(--button-fondo, #94b755);

            /* sombra */
            box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.25);
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
                border-radius: 40px;
                background: var(--profile-default, rgba(217, 217, 217, 0.82));
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
                &:checked {
                    border-radius: 40px;
                    border: 4px solid var(--session-fondo, #0892b6);
                    background: var(--profile-selected, #d9d9d9);
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
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
                color: var(--text-primary, #110300);
                text-align: center;

                /* PC/Label */
                font-family: Quicksand;
                font-size: 35px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                img {
                    width: 100px;
                    height: 100px;
                }
                p {
                    color: var(--text-primary, #110300);
                    text-align: center;

                    /* PC/Minitext */
                    font-family: Quicksand;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
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
