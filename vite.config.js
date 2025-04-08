import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.jsx"],
            refresh: true,
        }),
        react(),
        tailwindcss(),
        flowbiteReact(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
            "@Components": path.resolve(__dirname, "resources/js/Components"),
            "@Pages": path.resolve(__dirname, "resources/js/Pages"),
            "@Services": path.resolve(__dirname, "resources/js/Services"),
            "@Models": path.resolve(__dirname, "resources/js/Models"),
            "@Layouts": path.resolve(__dirname, "resources/js/Layouts"),
            "@Themes": path.resolve(__dirname, "resources/js/Themes"),
        },
    },
});
