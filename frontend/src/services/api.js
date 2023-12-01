import axios from "axios";

export default class apiService {
    token = "";
    api;

    API_URL = "http://localhost/api";

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

    // Token
    getToken() {
        this.token = localStorage.getItem("token") || "";
        return this.token;
    }

    setToken() {
        this.getToken();
        this.api.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    }

    removeToken() {
        this.token = "";
        localStorage.removeItem("token");
        this.api.defaults.headers.common.Authorization = "";
    }

    checkToken() {
        this.setToken();
        return this.api.get("/check-token");
    }

    // User
    async login(email, password) {
        return this.api.post("/login", {
            email,
            password,
        });
    }

    async register(email, password) {
        return this.api.post("/register", {
            email,
            password,
        });
    }

    async logOut() {
        this.setToken();
        return this.api.get("/logout");
    }

    // Characters
    async getCharacters() {
        this.setToken();
        return this.api.get("/characters");
    }

    // Profile
    async getProfiles() {
        this.setToken();
        return this.api.get("/profiles");
    }

    async getProfile(id) {
        this.setToken();
        return this.api.get(`/profile/${id}`);
    }

    async getProfilesByUserId(id) {
        this.setToken();
        return this.api.get("/user/${id}/profiles");
    }

    async updateProfile(farmer_name, farm_name, color) {
        this.setToken();
        return this.api.put("/profile", {
            farmer_name,
            farm_name,
            color,
        });
    }

    async deleteProfile() {
        this.setToken();
        return this.api.delete("/profile");
    }
}
