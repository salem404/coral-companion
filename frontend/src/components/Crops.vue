<template>
    <details class="category" open>
        <summary class="category__header">Crops</summary>
        <ul class="category__list" v-for="crop in crops">
            <li class="category__list-item" v-if="crop">
                <img
                    class="category__list-item-img"
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
 * @module Crops
 * @description This module represents the Crops component.
 */

import apiServiceMixin from "@/services/apiServiceMixin.js";

/**
 * @vue-component
 * @name Crops
 * @description This component displays a list of crops.
 * @vue-prop {String} season - The current season.
 * @mixes apiServiceMixin
 */
export default {
    name: "Crops",
    mixins: [apiServiceMixin],
    props: {
        /**
         * @vue-prop {String} season - The current season.
         */
        season: {
            type: String,
            required: true,
        },
    },
    data() {
        /**
         * @vue-data {Array} crops - List of crops.
         */
        return {
            crops: [],
        };
    },
    async mounted() {
        await this.fetchCrops();
    },
    methods: {
        /**
         * @vue-method fetchCrops
         * @description Fetches the crops for the current season.
         * @returns {void}
         */
        async fetchCrops() {
            while (!this.apiService) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            try {
                const response = await this.apiService.getSeasonalCrops(
                    this.season,
                );
                this.crops = response.data;
            } catch (error) {
                console.error(error);
            }
        },
    },
    watch: {
        /**
         * @vue-watch season
         * @description Watches for changes in the season prop and fetches new crops.
         */
        season: {
            handler: "fetchCrops",
            immediate: true,
        },
    },
};
</script>
