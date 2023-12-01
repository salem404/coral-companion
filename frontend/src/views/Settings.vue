<template>
    <div class="settings">
        <header class="settings__header">
            <h1 class="settings__title">Settings</h1>
        </header>
        <form>
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
                        <span>
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
                        </span>
                    </div>
                </form>
            </div>
            <section class="settings__container">
                <section class="settings__profiles">
                    <div>
                        <h2>Profile</h2>
                        <span>Delete profile</span>
                    </div>
                    <div>
                        <fieldset>
                            <label for="farmerName">Farmer name</label>
                            <input
                                type="text"
                                name="farmerName"
                                id="farmerName"
                                placeholder="Farmer name"
                            />
                        </fieldset>
                        <fieldset>
                            <label for="farmName">Farm Name</label>
                            <input
                                type="text"
                                name="farmName"
                                id="farmName"
                                placeholder="Farm Name"
                            />
                        </fieldset>
                    </div>
                </section>
                <section class="settings__profiles">
                    <div>
                        <h2>Account</h2>
                        <span>Delete account</span>
                    </div>
                    <div>
                        <fieldset>
                            <label for="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset>
                            <label for="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                            />
                        </fieldset>
                    </div>
                </section>
                <section class="btns">
                    <button
                        type="button"
                        @click="
                            hasHistory() ? $router.go(-1) : $router.push('/')
                        "
                        class="settings__btn"
                    >
                        Back
                    </button>
                    <button type="submit" class="settings__btn">Save</button>
                </section>
            </section>
        </form>
    </div>
</template>
<script>
import { RouterLink } from "vue-router";
import apiService from "@/services/api.js";

export default {
    name: "Settings",
    components: { RouterLink },
    data() {
        return {
            profiles: [],
            apiService: null,
            id: 2,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    async mounted() {
        await this.fetchProfiles();
    },
    methods: {
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
            }
        },
    },
};
</script>
<style lang="scss">
.btns {
    display: flex;
    height: 125px;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
}
.settings {
    display: flex;
    width: 100%;
    height: 100%;
    padding: var(--espaciado-mobile-80, 7px) 100px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--espaciado-desktop-100, 28px);
    flex-shrink: 0;
    &__btn {
        cursor: pointer;
        display: flex;
        width: 300px;
        padding: var(--button-vertical-padding, 12px)
            var(--button-horizontal-padding, 63px);
        justify-content: center;
        align-items: center;
        border-radius: var(--button-radio, 40px);
        background: var(--button-fondo, #94b755);
        color: var(--button-text, #110300);
        text-align: center;

        /* PC/Button */
        font-family: Quicksand;
        font-size: 35px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        /* sombra */
        box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.25);
    }
    &__title {
        color: var(--text-primary, #110300);

        /* PC/Title2 */
        font-family: General Sans;
        font-size: 72px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    &__container {
        display: flex;
        padding: var(--espaciado-desktop-200, 42px)
            var(--espaciado-desktop-400, 95px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1 0 0;
        align-self: stretch;
        border-radius: var(--radio, 40px);
        border-top: 28px solid var(--borde-borde, #135c7d);
        border-right: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        border-bottom: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        border-left: var(--fieldset-label-hpadding, 28px) solid
            var(--borde-borde, #135c7d);
        background: var(--fondo-settings, rgba(217, 217, 217, 0.82));
    }
    form {
        width: 100%;
        fieldset {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 0.4375rem;

            label {
                color: var(--text-label, #110300);

                padding: 0px var(--fieldset-label-hpadding, 28px);
                /* PC/Label */
                font-family: Quicksand;
                font-size: 35px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
            input {
                color: var(--text-primary, #110300);

                /* PC/P */
                font-family: Quicksand;
                font-size: 28px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 18.75rem;
                padding: 0.6875rem 1.5rem;
                color: var(--text-primary);
                background: var(--input-fondo);
                border-radius: 2.5rem;
                box-shadow: 0px 4px 4px 0px rgba(17, 3, 0, 0.25);

                &::placeholder {
                    color: var(--text-placeholder);
                }

                &:focus {
                    outline: 4px solid var(--input-icon);
                }

                &:invalid {
                    outline: 4px solid var(--button-error);
                }
            }
        }
    }
    &__profiles {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
        gap: 10px;
        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
        }

        h2 {
            color: var(--text-primary, #110300);

            /* PC/H2 */
            font-family: General Sans;
            font-size: 50px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
        span {
            color: var(--text-primary, #110300);
            text-align: center;

            /* PC/P-Link */
            font-family: Quicksand;
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-decoration-line: underline;
        }
    }
}
.profiles {
    &__container {
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
</style>
