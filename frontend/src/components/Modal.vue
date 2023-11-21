<!-- Modal.vue -->
<template>
    <dialog>
        <div class="modal">
            <div class="modal-content">
                <slot></slot>
                <button class="btn" @click="closeModal">Go Back</button>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>
