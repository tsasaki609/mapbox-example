import Vue from "vue";
import VueRouter from "vue-router";
import Mapbox from "../views/Mapbox.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "mapbox",
    component: Mapbox
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
