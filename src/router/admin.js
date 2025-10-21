// src/router/admin.js
import AdminLayout from "@/admin/AdminLayout.vue";
import PaymentHistory from "@/admin/PaymentHistory.vue";
import UserManagement from "@/admin/UserManagement.vue";
import PostManagement from "@/admin/PostManagement.vue";
import StoryManagement from "@/admin/StoryManagement.vue";
import { checkAdminAuth } from "@/middleware/auth";
export default {
  path: "/admin",
  component: AdminLayout,
  meta: { requiresAuth: true, role: "admin" },
  children: [
    {
      path: "payment-history",
      name: "PaymentHistory",
      component: PaymentHistory,
      beforeEnter: checkAdminAuth
    },
    {
      path: "user-management",
      name: "UserManagement",
      component: UserManagement,
    },
      {
      path: "story-management",
      name: "StoryManagement",
      component: StoryManagement
    },
          {
      path: "post-management",
      name: "PostManagement",
      component: PostManagement
    },
  ],
};
