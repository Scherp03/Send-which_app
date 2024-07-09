const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      { path: "/register", component: () => import("pages/RegisterPage.vue") },
      { path: "/ingredients",component: () => import("pages/IngredientsPage.vue")},
      
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthUserPage.vue") },
      { path: "/auth/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/auth/ingredients",component: () => import("pages/IngredientsPage.vue")},
      { path: "/order",component: () => import("pages/OrderPage.vue")}, 
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
