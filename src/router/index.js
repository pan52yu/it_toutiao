import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout"),
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/demo",
    component: () => import("@/views/Demo"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
