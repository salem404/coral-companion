<template>
    <footer>
        <a
            href="https://github.com/salem404/coral-companion"
            alt="GitHub Repository"
        >
            <picture class="btn-UIgithub">
                <!-- TODO: Add png image fallback -->
                <img src="@/assets/img/GitHubIcon.svg" alt="Github" />
            </picture>
        </a>
        <button
            v-if="isLogged"
            class="btn-UIlogOut"
            @click="openModal"
        ></button>
        <Modal v-if="showModal" @closeModal="closeModal">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
            >
                <path
                    d="M60.0008 50.0007L70.0008 40.0007M70.0008 40.0007L60.0008 30.0007M70.0008 40.0007H23.3341M46.6675 53.3341V62.0007C46.6675 66.419 43.0857 70.0007 38.6675 70.0007H18.0008C13.5825 70.0007 10.0008 66.419 10.0008 62.0007V18.0007C10.0008 13.5825 13.5825 10.0007 18.0008 10.0007H38.6675C43.0857 10.0007 46.6675 13.5825 46.6675 18.0007L46.6675 26.6674"
                    stroke="var(--text-primary)"
                    stroke-width="5.97015"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <h2 class="title2">See you soon!</h2>
            <div class="btns-container">
                <button class="btn-danger" @click="logOut()">Log Out</button>
                <button class="btn" @click="closeModal">Go Back</button>
            </div>
        </Modal>
    </footer>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapState, mapMutations } from "vuex";
import apiService from "@/services/api.js";

export default {
    name: "TheFooter",
    computed: {
        ...mapState(["isLogged"]),
    },
    components: { Modal },
    data() {
        return {
            showModal: false,
            apiService: null,
        };
    },
    created() {
        this.apiService = new apiService();
    },
    methods: {
        ...mapMutations(["changeLoggedState"]),
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async logOut() {
            try {
                const response = await this.apiService.logOut();
                localStorage.removeItem("token");
                this.changeLoggedState(false);
                console.log(response);
                this.closeModal();
                location.reload();
            } catch (error) {
                if (error.response.status === 401) {
                    // In case the token is invalid
                    localStorage.removeItem("token");
                    this.changeLoggedState(false);
                    console.log("Unauthorized");
                    this.closeModal();
                    location.reload();
                }
                console.log(error);
            }
        },
    },
};
</script>
