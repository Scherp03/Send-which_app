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
      { path: "/contacts",component: () => import("pages/ContactPage.vue")},
      
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthUserPage.vue") },
      { path: "/auth/settings", component: () => import("pages/SettingsPage.vue") },
      { path: "/auth/ingredients",component: () => import("pages/IngredientsPage.vue")},
      { path: "/auth/order",component: () => import("pages/OrderPage.vue")}, 
      { path: "/auth/contacts",component: () => import("pages/ContactPage.vue")},
      { path: "/auth/account",component: () => import("pages/AccountPage.vue")},
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AdminView/AdminPage.vue") },
     
    ],
  },
  {
    path: "/orderSuccess",
    component: () => import("layouts/OrderSuccessLayout.vue"),
    children: [
      { path: "", component: () => import("pages/OrderSuccessPage.vue") },
     
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
