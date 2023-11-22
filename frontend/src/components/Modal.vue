<!-- Modal.vue -->
<template>
    <dialog>
        <div class="modal" focused>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
        <button class="x" @click="closeModal" aria-label="Close Modal">X</button>
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
<style scoped>
.x {
    font-family: General Sans;
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
    border: none;
    background: none;
    font-size: 2rem;
    color: var(--text-secondary);
}
</style>
