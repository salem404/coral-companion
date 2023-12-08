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
     * Logout from the API service.
     * @returns {Promise} The response from the API.
     */
    async logOut() {
        this.setToken();
        return this.api.get("/logout");
    }

    /**
     * Get profiles by user ID from the API service.
     * @param {string} id - The ID of the user.
     * @returns {Promise} The response from the API.
     */
    async getProfilesByUserId(id) {
        this.setToken();
        return this.api.get(`/user/${id}/profiles`);
    }

    /**
     * Get a profile by ID from the API service.
     * @param {string} id - The ID of the profile.
     * @returns {Promise} The response from the API.
     */
    async getProfileById(id) {
        this.setToken();
        return this.api.get(`/profiles/${id}`);
    }

    /**
     * Create a profile from the API service.
     * @param {string} farmer_name - The farmer name.
     * @param {string} farm_name - The farm name.
     * @param {string} user_id - The user ID.
     * @returns {Promise} The response from the API.
     */
    async createProfile(farmer_name, farm_name, user_id) {
        this.setToken();
        return this.api.post(`/profiles`, {
            farmer_name,
            farm_name,
            user_id,
        });
    }
}
