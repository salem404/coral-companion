import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import Home from "@/views/Home.vue";

// Changes url depending on the environment
const API_URL = import.meta.env.PROD
    ? "https://proyectotema3api.onrender.com/api"
    : "http://localhost/api";

// TODO: Change when deployed
const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
