import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomeView.vue"),
      beforeEnter: (_, __, next) => {
        if (localStorage.getItem("token")) next();
        else next("/login");
      },
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("@/views/EditView.vue"),
      beforeEnter: (_, __, next) => {
        if (localStorage.getItem("token")) next();
        else next("/login");
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: (_, __, next) => {
        if (!localStorage.getItem("token")) next();
        else next("/");
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
});

export default router;
