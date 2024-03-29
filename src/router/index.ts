import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetail from "../views/MovieDetail.vue";
import HomeTMDB from "@/views/HomeTMDB.vue";
import LandingView from "@/views/LandingView.vue";

const routes = [
  {
    path: "/",
    name: "LandingView",
    component: LandingView,
  },
  {
    path: "/Search/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/movie/:id",
    name: "Movie Detail",
    component: MovieDetail,
  },
  {
    path: "/TMDB/",
    name: "HomeTMDB",
    component: HomeTMDB,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
