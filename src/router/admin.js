// src/router/admin.js
import AdminLayout from "@/admin/AdminLayout.vue";
import PaymentHistory from "@/admin/PaymentHistory.vue";
import UserManagement from "@/admin/UserManagement.vue";
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
  ],
};
