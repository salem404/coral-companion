<template>
    <details class="category" open>
        <summary class="category__header">Characters</summary>
        <ul class="category__list" v-for="person in people">
            <li class="category__list-item" v-if="person">
                <span>
                    <img
                        class="category__list-item-img"
                        :src="person.icon"
                        alt="crop"
                    />
                    {{ person.name }}
                </span>

                {{ person.birthday }}
            </li>
        </ul>
    </details>
</template>
<script>
/**
 * @module People
 * @description This module represents the People component.
 */

import apiServiceMixin from "@/services/apiServiceMixin.js";

/**
 * @vue-component
 * @name People
 * @description This component displays a list of people.
 * @vue-prop {String} season - The selected season.
 * @mixes apiServiceMixin
 */
export default {
    name: "People",
    mixins: [apiServiceMixin],
    props: {
        /**
         * @vue-prop {String} season - The selected season.
         */
        season: {
            type: String,
            required: true,
        },
    },
    data() {
        /**
         * @vue-data {Array} people - List of people.
         */
        return {
            people: [],
        };
    },
    async mounted() {
        await this.fetchPeople();
    },
    methods: {
        /**
         * @vue-method fetchPeople
         * @description Fetches the people for the selected season.
         * @returns {void}
         */
        async fetchPeople() {
            while (!this.apiService) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            try {
                const response = await this.apiService.getSeasonalCharacters(
                    this.season,
                );
                this.people = response.data.sort(
                    (a, b) => new Date(a.birthday) - new Date(b.birthday),
                );
            } catch (error) {
                console.error(error);
            }
        },
    },
    watch: {
        /**
         * @vue-watch season
         * @description Watches for changes in the season prop and fetches new people.
         */
        season: {
            handler: "fetchPeople",
            immediate: true,
        },
    },
};
</script>
