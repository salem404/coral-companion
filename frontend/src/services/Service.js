import axios from "axios";

export class Service {
    token = "";
    api;

    // TODO: Change url when deployed
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:8000/api",
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

    // User
    async login(mail, password) {
        return this.api.post("/login", {
            mail,
            password,
        });
    }

    async register(name, mail, password) {
        return this.api.post("/register", {
            name,
            mail,
            password,
        });
    }

    async logOut() {
        this.setToken();
        return this.api.get("/logout");
    }
}
