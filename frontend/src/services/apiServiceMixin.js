/**
 * @module apiServiceMixin
 * @mixin
 * @description {@link module:apiServiceMixin|apiServiceMixin} to initialize the apiService instance in a Vue component
 * @global
 * @property {Function} data - The data function returning the component's data
 * @property {Function} created - The created lifecycle hook
 */
import apiService from "@/services/api.js";

export default {
    data() {
        /**
         * @vue-data apiService
         * @description The apiService instance
         * @returns {Object} The apiService instance
         */
        return {
            apiService: null,
        };
    },
    created() {
        /**
         * @vue-lifecycle created
         * @description Vue.js lifecycle hook that is called after the instance has been created. Initializes the apiService instance
         */
        this.apiService = new apiService();
    },
};
