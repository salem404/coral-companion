import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        port: 8000, // This is the port which we will use in docker
    },
});
