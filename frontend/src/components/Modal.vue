<template>
    <dialog>
        <div class="modal" focused>
            <div class="modal-content">
                <slot></slot>
            </div>
        </div>
        <button class="x" @click="closeModal" aria-label="Close Modal">
            X
        </button>
    </dialog>
</template>
<script>
/**
 * @module Modal
 * @vue-component
 * @description {@link module:Modal|Modal} component that represents a modal window.
 */
export default {
    methods: {
        /**
         * @vue-method closeModal
         * @description Emits a 'closeModal' event to the parent component.
         */
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>
<style>
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
