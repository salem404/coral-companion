<template>
    <div class="profile">
        <h1 class="profile__title">Profile select</h1>
        <form
            class="profile__container"
            @submit.prevent="handleProfileSelection"
        >
            <div class="carrousel">
                <fieldset
                    class="carrousel__item"
                    v-for="profile in profiles"
                    :key="profile.id"
                >
                    <input
                        type="radio"
                        :id="profile.id"
                        name="profileSelection"
                        :value="profile.id"
                        required
                    />
                    <label :for="profile.id">
                        <picture class="gnome-carrousel">
                            <img src="@/assets/img/gnome2.svg" alt="" />
                        </picture>
                        {{ profile.farmer_name }}
                        <p>
                            {{ profile.farm_name }}
                        </p>
                    </label>
                </fieldset>
            </div>
            <div class="profile__buttons">
                <button class="btn" type="submit">Select</button>
                <RouterLink class="btn" :to="{ name: 'settings' }">
                    Settings
                </RouterLink>
            </div>
        </form>
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
        ...mapState(["user", "profile"]),
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
        handleProfileSelection() {
            // Update the profile in the store
            this.changeProfile(this.profiles[0]);
        },
        async fetchProfiles() {
            try {
                if (!this.user) {
                    console.error("User is not defined");
                    return;
                }
                const response = await this.apiService.getProfilesByUserId(
                    this.user.id,
                );
                this.profiles = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
