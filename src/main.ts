import { createApp } from "vue";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import router from "./router";

createApp(App).use(router).component("Home", HomeView).mount("#app"); // Register the Home component
