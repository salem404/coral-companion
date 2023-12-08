import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "@/App.vue";
import store from "@/store";

/**
 * @typedef {Object} Route
 * @property {string} path - The path of the route.
 * @property {string} name - The name of the route.
 * @property {Function} component - A function that returns a Promise that resolves to the component.
 */

/**
 * @type {Route[]} routes - The routes of the application.
 */
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

/**
 * @type {import('vue-router').Router} router - The router of the application.
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

/**
 * This function is called before each route.
 * It checks if the user is authenticated and if the profile is present in the Vuex state.
 * If the user is not authenticated, it redirects them to the home page.
 */
router.beforeEach((to, from, next) => {
    const publicPages = ["/"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("token");

    if (authRequired && !loggedIn) {
        return next("/");
    }

    next();
});

/**
 * @type {import('vue').App} app - The Vue application.
 */
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
