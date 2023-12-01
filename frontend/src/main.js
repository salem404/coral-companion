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
    {
        path: "/profiles",
        name: "profiles",
        component: () => import("@/views/Profiles.vue"),
    },
    {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/Settings.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("token");

    if (authRequired && !loggedIn) {
        return next("/");
    }

    next();
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
