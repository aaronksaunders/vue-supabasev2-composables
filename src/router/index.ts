import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import DetailPageVue from "@/views/DetailPage.vue";
import AddItemPageVue from "@/views/AddItemPage.vue";
import AddImagePageVue from "@/views/AddImagePage.vue";
import AddOrganizationPage from "@/views/AddOrganizationPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  { path: "/detail/:id", component: DetailPageVue, props: true },
  { path: "/add-item", component: AddItemPageVue },
  { path: "/add-image", component: AddImagePageVue },
  { path: "/add-org", component: AddOrganizationPage },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
