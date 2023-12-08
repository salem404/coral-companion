<template>
    <details class="crops" open>
        <summary class="crops__header">Crops</summary>
        <ul class="crops__list" v-for="crop in crops">
            <li class="crops__list-item" v-if="crop">
                <img
                    class="crops__list-item-img"
                    :src="crop.crop.resource.icon"
                    alt="crop"
                />
                {{ crop.crop.resource.name }}
            </li>
        </ul>
    </details>
</template>
<script>
/**
 * @vue-prop {String} season - Estación seleccionada
 * @vue-data {Array} [crops = []] - Lista de personas
 * @vue-event {Array} fetchCrops - Llama a la api para adquirir la lista de cultivos
 */
export default {
    name: "Crops",
    props: {
        season: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            crops: [],
            API_URL: "http://localhost/api",
        };
    },
    async mounted() {
        await this.fetchCrops();
    },
    methods: {
        async fetchCrops() {
            const response = await fetch(
                `${this.API_URL}/crops/season/${this.season}`,
            );
            const data = await response.json();
            this.crops = data;
        },
    },
    watch: {
        season: {
            handler: "fetchCrops",
            immediate: true,
        },
    },
};
</script>
<style lang="scss">
.crops {
    display: flex;
    width: 266.833px;
    flex-direction: column;
    align-items: center;
    &__header {
        color: var(--resources-category-text, #110300);

        /* PC/P */
        font-family: Quicksand;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        width: 266.833px;
        padding: var(--dropdown-vertical-padding, 12px)
            var(--dropdown-horizontal-padding, 19px);
        justify-content: space-between;
        align-items: flex-start;
        border-radius: var(--dropdown-radio, 5px);
        border: 2px solid var(--resources-item-border, #135c7d);
        background: var(--resources-category-dropdown, #94b755);
    }
    &__list {
        display: flex;
        width: 266.833px;
        padding: var(--dropdown-item-vpadding, 12px)
            var(--dropdown-item-hpadding, 19px);
        justify-content: space-between;
        align-items: flex-start;
        border-top: 1px solid var(--resources-item-border, #135c7d);
        border-bottom: 1px solid var(--resources-item-border, #135c7d);
        background: var(--resources-item, #0892b6);
        color: var(--resources-item-text, #110300);

        /* PC/P */
        font-family: Quicksand;
        font-size: 28px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        img {
            width: 28px;
            height: 100%;
        }
    }
}
</style>
