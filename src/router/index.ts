import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/waitplease",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/offline",
    component: () => import("../views/Offline.vue"),
  },
  {
    path: "/tournament",
    name: "battle",
    component: () => import("../views/Battle.vue"),
  },
  {
    path: "/claim-history",
    name: "claim-history",
    component: () => import("../views/ClaimHistory.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "battle" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tournament = getTournament();

  if (!tournament) {
    return next();
  }

  await tournament.fetchStatus()

  const { isActive } = storeToRefs(useTournamentStore());

  if (to.name === "home" && isActive.value) {
    return next('/tournament');
  }

  if (to.name === "battle" && !isActive.value) {
    return next('/waitplease');
  }

  next()
})

export default router;
