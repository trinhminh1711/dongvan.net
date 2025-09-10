// src/middleware/auth.js
import { useAuthStore } from "@/stores/auth";

export default function requireAuth(to, from, next) {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    // chưa login thì redirect về trang login
    return next({ name: "Home" });
  }

  next(); // đã login thì cho đi tiếp
}
