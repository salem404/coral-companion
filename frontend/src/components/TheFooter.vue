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
        <button class="btn-UIlogOut" @click="openModal"></button>
        <Modal v-if="showModal" @closeModal="closeModal">
            <!-- Modal content goes here -->
            <h2>Hello from the modal!</h2>
        </Modal>
    </footer>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
    name: "TheFooter",
    components: { Modal },
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
};
</script>
