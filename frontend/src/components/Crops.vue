<template>
    <details class="category" open>
        <summary class="category__header">Crops</summary>
        <ul class="category__list" v-for="crop in crops">
            <li class="category__list-item" v-if="crop">
                <span>
                    <img
                        class="category__list-item-img"
                        :src="crop.crop.resource.icon"
                        alt="crop"
                    />
                    {{ crop.crop.resource.name }}
                </span>
            </li>
        </ul>
    </details>
</template>
<script>
// Importing the apiServiceMixin for making API calls
import apiServiceMixin from "@/services/apiServiceMixin.js";

/**
 * @vue-component
 * @module Crops
 * @description This component displays a list of crops based on the current season. It uses the apiServiceMixin to fetch the data.
 * @vue-data {Array} crops - An array to store the list of crops fetched from the API.
 * @vue-prop {String} season - The current season for which the crops are to be displayed. This prop is required.
 * @mixes apiServiceMixin
 */
export default {
    name: "Crops",
    mixins: [apiServiceMixin],
    props: {
        season: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            crops: [],
        };
    },
    async mounted() {
        // Fetch the crops as soon as the component is mounted
        await this.fetchCrops();
    },
    methods: {
        /**
         * @vue-method fetchCrops
         * @description This method fetches the crops for the current season from the API and stores them in the crops data property.
         * @returns {void}
         */
        async fetchCrops() {
            // Wait until the apiService is available
            while (!this.apiService) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            try {
                // Fetch the crops for the current season
                const response = await this.apiService.getSeasonalCrops(
                    this.season,
                );
                // Store the fetched crops in the crops data property
                this.crops = response.data;
            } catch (error) {
                // Log any errors that occur during the fetch
                console.error(error);
            }
        },
    },
    watch: {
        // Triggers the fetchCrops method whenever the season prop changes, ensuring that the displayed crops are always relevant to the current season.
        season: {
            handler: "fetchCrops",
            immediate: true,
        },
    },
};
</script>
