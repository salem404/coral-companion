<template>
    <div class="settings">
        <header class="settings__header">
            <h1 class="settings__title">Settings</h1>
        </header>
        <form @submit.prevent="handleEdit">
            <section class="settings__container">
                <section v-if="withProfile" class="settings__section">
                    <header class="section__header">
                        <h2>Profile</h2>
                        <button type="button" @click="openProfileModal">
                            Delete profile
                        </button>
                    </header>
                    <div>
                        <fieldset>
                            <label for="farmerName">Farmer Name</label>
                            <input
                                type="text"
                                name="farmerName"
                                v-model="farmerName"
                                id="farmerName"
                                placeholder="Farmer Name"
                                required
                            />
                        </fieldset>
                        <fieldset>
                            <label for="farmName">Farm Name</label>
                            <input
                                type="text"
                                name="farmName"
                                v-model="farmName"
                                id="farmName"
                                placeholder="Farm Name"
                                required
                            />
                        </fieldset>
                    </div>
                </section>
                <section class="settings__section">
                    <header class="section__header">
                        <h2>Account</h2>
                        <button type="button" @click="openAccountModal">
                            Delete account
                        </button>
                    </header>
                    <div>
                        <fieldset>
                            <label for="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                v-model="email"
                                id="email"
                                placeholder="Email"
                                disabled
                            />
                        </fieldset>
                    </div>
                </section>
                <p v-if="error" class="error">{{ error }}</p>
                <section class="settings__bottom">
                    <button type="submit" class="settings__btn">Save</button>
                    <RouterLink
                        class="settings__btn"
                        :to="{ name: 'profiles' }"
                    >
                        Back
                    </RouterLink>
                </section>
            </section>
        </form>
    </div>
    <Modal v-if="showProfileModal" @closeModal="closeProfileModal">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
        >
            <path
                d="M9.01288 13.3749L12.9446 46.974C13.9288 55.3852 14.421 59.5909 17.2635 62.1202C20.1061 64.6495 24.3404 64.6495 32.809 64.6495H35.3843C43.9374 64.6495 48.2139 64.6495 51.0657 62.0846C53.9174 59.5197 54.3691 55.2671 55.2724 46.7618L58.8184 13.3749"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
            />
            <path
                d="M3.13397 14.3206H64.8574"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M28.2219 28.1503V49.876"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M39.7697 28.1503V49.876"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M48.1667 14.3206V13.8885C48.1667 10.0289 48.1667 8.09916 47.3918 6.63564C46.7664 5.45458 45.8006 4.48873 44.6195 3.8634C43.156 3.0885 41.2262 3.0885 37.3666 3.0885H30.3093C26.4498 3.0885 24.52 3.0885 23.0565 3.8634C21.8754 4.48873 20.9096 5.45458 20.2842 6.63564C19.5093 8.09916 19.5093 10.0289 19.5093 13.8885V14.3206"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
            />
        </svg>
        <h2 class="title2">Are you sure?</h2>
        <p class="error">This action can't be undone</p>
        <div class="btns-container">
            <button class="btn-danger" @click="deleteProfile()">Delete</button>
            <button class="btn" @click="closeProfileModal">Go Back</button>
        </div>
    </Modal>
    <Modal v-if="showAccountModal" @closeModal="closeAccountModal">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
        >
            <path
                d="M9.01288 13.3749L12.9446 46.974C13.9288 55.3852 14.421 59.5909 17.2635 62.1202C20.1061 64.6495 24.3404 64.6495 32.809 64.6495H35.3843C43.9374 64.6495 48.2139 64.6495 51.0657 62.0846C53.9174 59.5197 54.3691 55.2671 55.2724 46.7618L58.8184 13.3749"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
            />
            <path
                d="M3.13397 14.3206H64.8574"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M28.2219 28.1503V49.876"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M39.7697 28.1503V49.876"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
                stroke-linecap="round"
            />
            <path
                d="M48.1667 14.3206V13.8885C48.1667 10.0289 48.1667 8.09916 47.3918 6.63564C46.7664 5.45458 45.8006 4.48873 44.6195 3.8634C43.156 3.0885 41.2262 3.0885 37.3666 3.0885H30.3093C26.4498 3.0885 24.52 3.0885 23.0565 3.8634C21.8754 4.48873 20.9096 5.45458 20.2842 6.63564C19.5093 8.09916 19.5093 10.0289 19.5093 13.8885V14.3206"
                stroke="var(--text-primary)"
                stroke-width="5.97015"
            />
        </svg>
        <h2 class="title2">Are you sure?</h2>
        <p class="error">This action can't be undone</p>
        <div class="btns-container">
            <button class="btn-danger" @click="deleteAccount()">Delete</button>
            <button class="btn" @click="closeAccountModal">Go Back</button>
        </div>
    </Modal>
</template>
<script>
import { RouterLink } from "vue-router";
import { mapMutations, mapState } from "vuex";
import apiServiceMixin from "@/services/apiServiceMixin.js";
import Modal from "../components/Modal.vue";

/**
 * @module Settings
 * @description Vue component that represents the settings page.
 * @description {@link module:Settings|Settings} component that represents the settings page.
 */
export default {
    name: "Settings",
    mixins: [apiServiceMixin],
    components: { RouterLink, Modal },
    computed: {
        ...mapState(["user", "profile"]),
    },
    data() {
        return {
            withProfile: false,
            showAccountModal: false,
            showProfileModal: false,
            farmerName: "",
            farmName: "",
            email: "",
            selectedProfile: null,
            error: "",
        };
    },
    async mounted() {
        if (this.profile) {
            this.selectedProfile = this.profile.id;
            await this.fetchProfile();
        }
        this.email = this.user.email;
    },
    methods: {
        ...mapMutations(["changeProfile", "changeLoggedState", "changeUser"]),
        /**
         * @vue-method openAccountModal
         * @description Opens the account modal.
         */
        openAccountModal() {
            this.showAccountModal = true;
        },
        /**
         * @vue-method closeAccountModal
         * @description Closes the account modal.
         */
        closeAccountModal() {
            this.showAccountModal = false;
        },
        /**
         * @vue-method openProfileModal
         * @description Opens the profile modal.
         */
        openProfileModal() {
            this.showProfileModal = true;
        },
        /**
         * @vue-method closeProfileModal
         * @description Closes the profile modal.
         */
        closeProfileModal() {
            this.showProfileModal = false;
        },
        /**
         * @vue-method handleEdit
         * @description Handles the editing of the profile.
         */
        handleEdit() {
            if (!this.selectedProfile) {
                return;
            }

            if (!this.farmerName || !this.farmName) {
                this.error = "Please fill all the fields";
                return;
            }

            this.apiService
                .updateProfile(
                    this.selectedProfile,
                    this.farmerName,
                    this.farmName,
                )
                .then((response) => {
                    this.fetchProfile();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        /**
         * @vue-method deleteProfile
         * @description Deletes the selected profile.
         */
        deleteProfile() {
            try {
                this.apiService.deleteProfile(this.selectedProfile).then(() => {
                    this.closeProfileModal();
                    this.withProfile = false;
                    this.$store.commit("changeProfile", null);
                });
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @vue-method deleteAccount
         * @description Deletes the user account.
         */
        deleteAccount() {
            try {
                this.apiService.deleteAccount(this.user.id).then(() => {
                    this.closeAccountModal();
                    this.$store.commit("changeLoggedState", false);
                    this.$router.push({ name: "home" });
                    this.$store.commit("changeUser", null);
                    this.$store.commit("changeProfile", null);
                    localStorage.removeItem("token");
                });
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * @vue-method fetchProfile
         * @description Fetches the selected profile.
         */
        async fetchProfile() {
            if (!this.selectedProfile || this.selectedProfile === undefined) {
                return;
            }
            try {
                const response = await this.apiService.getProfileById(
                    this.selectedProfile,
                );
                this.farmName = response.data.farm_name;
                this.farmerName = response.data.farmer_name;
                this.withProfile = true;
                return response.data;
            } catch (error) {
                if (error.response.status === 404) {
                    this.withProfile = false;
                }
            }
        },
    },
};
</script>
