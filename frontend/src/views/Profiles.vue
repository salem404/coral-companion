<template>
    <svg
        class="wave-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1500 500"
        width="100%"
        height="100%"
        fill="none"
    >
        <path
            d="M235.5 3.24234C128.899 -13.0476 -0.000488281 37.3423 -0.000488281 37.3423L-8.18458e-07 1228.5H1512L1512 442.352C1455.5 442.352 1137 360.242 1011.5 360.242C886 360.242 756.598 272.048 729.5 258.852C702.401 245.656 632.5 196.352 529.5 136.852C441.478 86.0048 357 21.809 235.5 3.24234Z"
            fill="currentColor"
        />
        <image
            href="@/assets/img/foam.svg"
            x="-6.56rem"
            y="3.271rem"
            width="107rem"
            height="44rem"
        />
    </svg>
    <svg
        class="wave-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1500 500"
        width="100%"
        height="100%"
        fill="none"
    >
        <path
            d="M1336 313.9C1454.5 320.463 1512 331.4 1512 331.4V1094.5H0V0C105.101 43.7339 251.291 125.778 419.5 169.4C555.5 204.669 749.5 232.4 749.5 232.4C749.5 232.4 932.521 260.217 1050.5 271.9C1160.16 282.759 1217.5 307.337 1336 313.9Z"
            fill="currentColor"
        />
    </svg>
    <div class="profile">
        <h1 class="profile__title">Profile select</h1>
        <form
            class="profile__container"
            @submit.prevent="handleProfileSelection"
        >
            <div v-if="isLoading">Loading...</div>
            <div v-else class="carrousel">
                <fieldset>
                    <div
                        class="carrousel__item"
                        v-for="profile in profiles"
                        :key="profile.id"
                    >
                        <input
                            type="radio"
                            :id="profile.id"
                            name="profileSelection"
                            :value="profile.id"
                            v-model="selectedProfile"
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
                    </div>
                </fieldset>
                <button
                    type="button"
                    class="carrousel__item-new"
                    @click="openModal"
                >
                    <picture class="gnome-carrousel-new">
                        <img src="@/assets/img/gnome0.svg" alt="" />
                    </picture>
                    New
                </button>
            </div>
            <div class="profile__buttons">
                <button class="btn" type="submit">Select</button>
                <RouterLink class="btn" :to="{ name: 'settings' }">
                    Settings
                </RouterLink>
            </div>
        </form>
    </div>
    <Modal v-if="showModal" @closeModal="closeModal">
        <h2 class="title2">Create profile</h2>
        <form @submit.prevent="handleProfileCreation">
            <div class="modal-content__form">
                <fieldset>
                    <label for="newFarmerName">Farmer name</label>
                    <input
                        type="text"
                        name="newFarmerName"
                        id="newFarmerName"
                        placeholder="Farmer name"
                        v-model="newFarmerName"
                    />
                </fieldset>
                <fieldset>
                    <label for="farmName">Farm Name</label>
                    <input
                        type="text"
                        name="newFarmName"
                        id="newFarmName"
                        placeholder="Farm Name"
                        v-model="newFarmName"
                    />
                </fieldset>
            </div>
            <div class="btns-container">
                <button class="btn-danger" type="submit">Create</button>
                <button type="button" class="btn" @click="closeModal">
                    Go Back
                </button>
            </div>
        </form>
    </Modal>
</template>
<script>
/**
 * @module Profiles
 * @description Vue component for managing user profiles
 * @mixes apiServiceMixin
 */
import Modal from "@/components/Modal.vue";
import { RouterLink } from "vue-router";
import { mapMutations, mapState } from "vuex";
import apiServiceMixin from "@/services/apiServiceMixin.js";

export default {
    name: "Profiles",
    mixins: [apiServiceMixin],
    components: {
        /**
         * @vue-prop RouterLink
         * @description Vue Router Link component
         */
        RouterLink,
        /**
         * @vue-prop Modal
         * @description Modal component
         */
        Modal,
    },
    computed: {
        /**
         * @vue-computed user
         * @description The current user
         * @returns {Object} The Vuex state.
         */
        /**
         * @vue-computed profile
         * @description The current profile
         * @returns {Object} The Vuex state.
         */
        ...mapState(["user", "profile"]),
    },
    data() {
        /**
         * @vue-data {Array} profiles - List of profiles
         * @vue-data {Object} selectedProfile - The selected profile
         * @vue-data {boolean} isLoading - Loading state
         * @vue-data {boolean} showModal - Modal visibility state
         * @vue-data {string} newFarmerName - Name of the new farmer
         * @vue-data {string} newFarmName - Name of the new farm
         */
        return {
            profiles: [],
            selectedProfile: null,
            isLoading: false,
            showModal: false,
            newFarmerName: "",
            newFarmName: "",
        };
    },
    async mounted() {
        /**
         * @vue-lifecycle mounted
         * @description Vue.js lifecycle hook that is called after the instance has been mounted. Fetches the profiles and sets the selected profile
         */
        await this.fetchProfiles();
        if (this.profile) {
            this.selectedProfile = this.profile.id;
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(newValue, oldValue) {
                /**
                 * @vue-watch user
                 * @description Watcher for the user data property. Fetches the profiles when the user changes
                 */
                if (newValue !== oldValue) {
                    this.fetchProfiles();
                }
            },
        },
    },
    methods: {
        ...mapMutations(["changeProfile"]),
        /**
         * @vue-method handleProfileSelection
         * @description Handles the selection of a profile. Fetches the profile and redirects to the dashboard
         */
        handleProfileSelection() {
            // Update the profile in the store
            this.fetchProfile();
            // Redirect to the dashboard
            this.$router.push({ name: "dashboard" });
        },
        /**
         * @vue-method handleProfileCreation
         * @description Handles the creation of a profile. Creates a new profile and updates the selected profile
         */
        async handleProfileCreation() {
            try {
                const response = await this.apiService.createProfile(
                    this.newFarmerName,
                    this.newFarmName,
                    this.user.id,
                );
                this.fetchProfiles();
                this.selectedProfile = response.data.id;
                this.closeModal();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @vue-method openModal
         * @description Opens the modal
         */
        openModal() {
            this.showModal = true;
        },
        /**
         * @vue-method closeModal
         * @description Closes the modal
         */
        closeModal() {
            this.showModal = false;
        },
        /**
         * @vue-method fetchProfiles
         * @description Fetches the profiles for the current user
         */
        async fetchProfiles() {
            this.isLoading = true;
            try {
                const response = await this.apiService.getProfilesByUserId(
                    this.user.id,
                );
                this.profiles = response.data;
            } catch (error) {
            } finally {
                this.isLoading = false;
            }
        },
        /**
         * @vue-method fetchProfile
         * @description Fetches the selected profile
         */
        async fetchProfile() {
            try {
                const response = await this.apiService.getProfileById(
                    this.selectedProfile,
                );
                this.changeProfile(response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
