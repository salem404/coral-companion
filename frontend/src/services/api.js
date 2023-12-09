import axios from "axios";

/**
 * Class representing the API service.
 */
export default class apiService {
    /**
     * @property {string} token - The token for the API service.
     */
    token = "";

    /**
     * @property {Object} api - The axios instance for the API service.
     */
    api;

    /**
     * @property {string} API_URL - The base URL for the API service.
     */
    API_URL = "http://localhost/api";

    /**
     * Create a new API service.
     */
    constructor() {
        this.api = axios.create({
            baseURL: this.API_URL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        this.setToken();
    }

    /**
     * Get the token from local storage.
     * @returns {string} The token.
     */
    getToken() {
        this.token = localStorage.getItem("token") || "";
        return this.token;
    }

    /**
     * Set the token for the API service.
     */
    setToken() {
        this.getToken();
        this.api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    }

    /**
     * Remove the token from the API service and local storage.
     */
    removeToken() {
        this.token = "";
        localStorage.removeItem("token");
        this.api.defaults.headers.common.Authorization = "";
    }

    /**
     * Check the token for the API service.
     * @returns {Promise} The response from the API.
     */
    async checkToken() {
        this.setToken();
        return this.api.get("/check-token");
    }

    /**
     * Login to the API service.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise} The response from the API.
     */
    async login(email, password) {
        return this.api.post("/login", {
            email,
            password,
        });
    }

    /**
     * Register a new user to the API service.
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise} The response from the API.
     */
    async register(email, password) {
        return this.api.post("/register", {
            email,
            password,
        });
    }

    /**
     * Deletes a user account with the given ID.
     * @param {string} id - The ID of the user.
     * @returns {Promise} The response from the API.
     */
    async deleteAccount(id) {
        this.setToken();
        return this.api.delete(`/users/${id}`);
    }

    /**
     * Logs out from the API service.
     * @returns {Promise} The response from the API.
     */
    async logOut() {
        this.setToken();
        return this.api.get("/logout");
    }

    /**
     * Fetches profiles associated with a user ID.
     * @param {string} id - The ID of the user.
     * @returns {Promise} The response from the API. This will be the list of profiles for the specified user if the request is successful.
     */
    async getProfilesByUserId(id) {
        this.setToken();
        return this.api.get(`/user/${id}/profiles`);
    }

    /**
     * Fetches a profile with the given ID.
     * @param {string} id - The ID of the profile.
     * @returns {Promise} The response from the API. This will be the profile data if the request is successful.
     */
    async getProfileById(id) {
        this.setToken();
        return this.api.get(`/profiles/${id}`);
    }

    /**
     * Creates a new profile with the given details.
     * @param {string} farmer_name - The farmer name.
     * @param {string} farm_name - The farm name.
     * @param {string} user_id - The user ID.
     * @returns {Promise} The response from the API. This will be the data of the created profile if the request is successful.
     */
    async createProfile(farmer_name, farm_name, user_id) {
        this.setToken();
        return this.api.post(`/profiles`, {
            farmer_name,
            farm_name,
            user_id,
        });
    }

    /**
     * Updates a profile with the given ID and details.
     * @param {string} id - The ID of the profile.
     * @param {string} farmer_name - The farmer name.
     * @param {string} farm_name - The farm name.
     * @returns {Promise} The response from the API. This will be the data of the updated profile if the request is successful.
     */
    async updateProfile(id, farmer_name, farm_name) {
        this.setToken();
        return this.api.put(`/profiles/${id}`, {
            farmer_name,
            farm_name,
        });
    }

    /**
     * Deletes a profile with the given ID.
     * @param {string} id - The ID of the profile.
     * @returns {Promise} The response from the API.
     */
    async deleteProfile(id) {
        this.setToken();
        return this.api.delete(`/profiles/${id}`);
    }

    /**
     * Fetches the crops for a specific season.
     * @param {string} season_id - The ID of the season.
     * @returns {Promise} The response from the API. This will be the list of crops for the specified season if the request is successful.
     */
    async getSeasonalCrops(season_id) {
        this.setToken();
        return this.api.get(`/crops/season/${season_id}`);
    }

    /**
     * Fetches the characters for a specific season.
     * @param {string} season_id - The ID of the season.
     * @returns {Promise} The response from the API. This will be the list of characters for the specified season if the request is successful.
     */
    async getSeasonalCharacters(season_id) {
        this.setToken();
        return this.api.get(`/characters/season/${season_id}`);
    }

    async getTasksByProfileId(profile_id) {
        this.setToken();
        return this.api.get(`/profile/${profile_id}/tasks`);
    }

    async createTask(profile_id, description, isCompleted) {
        this.setToken();
        return this.api.post(`/tasks`, {
            description,
            profile_id,
            isCompleted,
        });
    }

    async updateTask(task_id, profile_id, description, isCompleted) {
        this.setToken();
        return this.api.put(`/tasks/${task_id}`, {
            profile_id,
            description,
            isCompleted,
        });
    }

    async deleteTask(task_id) {
        this.setToken();
        return this.api.delete(`/tasks/${task_id}`);
    }
}
