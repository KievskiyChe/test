import { createRouter, createWebHistory } from "vue-router";
import { HomeQuard, BattleQuard, ClaimHistoryQuard } from "./quards";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    beforeEnter: HomeQuard,
  },
  {
    path: "/offline",
    component: () => import("../views/Offline.vue"),
  },
  {
    path: "/battle",
    name: "battle",
    component: () => import("../views/Battle.vue"),
    beforeEnter: BattleQuard,
  },
  {
    path: "/claim-history",
    name: "claim-history",
    component: () => import("../views/ClaimHistory.vue"),
    beforeEnter: ClaimHistoryQuard,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
