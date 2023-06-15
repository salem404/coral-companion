<template>
    <div class="profiles">
        <h1 class="profiles__heading">Select your profile</h1>
        <div class="profiles__container">
            <form>
                <input
                    type="radio"
                    id="html"
                    name="fav_language"
                    value="HTML"
                />
                <label for="html">
                    <img src="../assets/img/gnome2.png" alt="" />
                    HTML
                </label>
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label for="css">
                    <img src="../assets/img/gnome2.png" alt="" />
                    CSS
                </label>
                <input
                    type="radio"
                    id="javascript"
                    name="fav_language"
                    value="JavaScript"
                />
                <label for="javascript">
                    <img src="../assets/img/gnome2.png" alt="" />
                    JavaScript
                </label>
            </form>
            <form v-for="profile in profiles">
                <input
                    type="radio"
                    id="{{ profile.id }}"
                    name="profileSelection"
                    value="{{profile.id}}}"
                />
                <label for="{{ profile.id }}">{{ profile.farmer_name }}</label>
            </form>

            <router-link to="/dashboard" class="profiles__container__btn">
                Play
            </router-link>
            <router-link to="/" class="profiles__container__btn">
                a
            </router-link>
        </div>
    </div>
</template>
<script>
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
};
</script>
<style lang="scss">
.profiles {
    display: flex;
    flex-direction: column;
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
        line-height: 173px;
        letter-spacing: 0em;
        text-align: center;
    }
    &__container {
        background: rgba(217, 217, 217, 0.83);
        border: 14px solid #135c7d;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        padding: 40px;
        form {
            display: flex;
            overflow: scroll;
            align-items: center;
            flex-wrap: nowrap;
            flex-direction: row;
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
                left: 403px;
                top: 99px;
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
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 235px;
                height: 311px;
                left: 403px;
                top: 99px;
                border-radius: 40px;
                border: 1px solid #110300;
                box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
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
