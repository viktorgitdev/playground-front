import { createRouter, createWebHashHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import Home from "../views/Home.vue";

export const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/list-events",
    name: "List Events",
    component: () => import("../views/ListEvents.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/form",
    name: "Form",
    login: false,
    component: () => import("../views/Form.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach(async (to, from) => {
//   console.log("auth0: ");

//   if (
//     // make sure the user is authenticated
//     !instance. .auth0.isAuthenticated &&
//     // ❗️ Avoid an infinite redirect
//     to.path !== "Form"
//   ) {
//     // redirect the user to the login page
//     loginWithRedirect();
//   }
// });
export default router;
