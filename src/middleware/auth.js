// src/middleware/auth.js
import { useAuthStore } from "@/stores/auth";

export function requireAuth(to, from, next) {
  const auth = useAuthStore();

  // Nếu chưa login → về trang login hoặc Home
  if (!auth.isAuthenticated || !auth.user) {
    return next({ name: "Home" });
  }

  next(); // ✅ cho đi tiếp nếu đã login
}

export function checkAdminAuth(to, from, next) {
  const auth = useAuthStore();

  // Nếu chưa login
  if (!auth.isAuthenticated || !auth.user) {
    return next({ name: "Home" });
  }

  // Nếu không phải admin
  if (auth.user.role !== "master_admin") {
    return next({ name: "forbidden" });
  }

  next(); // ✅ cho phép truy cập nếu là admin
}
