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
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
  {
    path: "/article/:articleId",
    component: () => import("@/views/article"),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
