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

    async getProfilesByUserId(id) {
        this.setToken();
        return this.api.get(`/user/${id}/profiles`);
    }
}
