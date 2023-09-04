import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../components/HelloWorld.vue"),
      meta: { requiresAuth: true }, // This route requires authentication
    },
    {
      path: "/login",
      component: () => import("../components/authentication/Login_Form.vue"),
      meta: { requiresGuest: true }, // This route is only accessible to guests (not logged in)
    },
    {
      path: "/signup",
      component: () => import("../components/authentication/Signup_Form.vue"),
      meta: { requiresGuest: true }, // This route is only accessible to guests (not logged in)
    },
  ],
});

// Add a navigation guard to check authentication status
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!currentUser) {
      // User is not authenticated, redirect to login
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      // User is authenticated, proceed to the route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    // Check if the route is only accessible to guests (not logged in)
    if (currentUser) {
      // User is already logged in, redirect to home
      next({ path: "/" });
    } else {
      // User is a guest, proceed to the route
      next();
    }
  } else {
    // For other routes that don't require authentication or guest status
    next();
  }
});

export default router;
 