import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profiles from "@/views/Profiles.vue";
import Settings from "@/views/Settings.vue";

// Changes url depending on the environment
const API_URL = import.meta.env.PROD
    ? "https://proyectotema3api.onrender.com/api"
    : "http://localhost/api";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/profiles",
        name: "profiles",
        component: Profiles,
    },
    {
        path: "/settings",
        name: "settings",
        component: Settings,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
