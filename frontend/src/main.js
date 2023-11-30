import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import store from "@/store";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
