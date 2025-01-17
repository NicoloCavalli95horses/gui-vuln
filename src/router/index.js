// ==============
// Import
// ==============
import { 
    createRouter,
    createWebHistory
  } from "vue-router";
  
  // ==============
  // Router
  // ==============
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/homeView.vue"),
      },
    ],
  });
  
  export default router;