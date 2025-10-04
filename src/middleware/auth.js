// src/middleware/auth.js
import { useAuthStore } from "@/stores/auth";

export function requireAuth(to, from, next) {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    // chưa login thì redirect về trang login
    return next({ name: "Home" });
  }

  next(); // đã login thì cho đi tiếp
}


export function checkAdminAuth(to, from, next) {

  
  const auth = useAuthStore();
    console.log(auth.user.role);
  if (auth.user.role != "master_admin") {
    return next({ name: "forbidden" });
  }
  next(); // đã login thì cho đi tiếp
}