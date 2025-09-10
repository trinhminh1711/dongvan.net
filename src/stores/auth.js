// src/stores/auth.js
import { defineStore } from "pinia";
import api from "@/api/axios";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    user: null, // thông tin chi tiết user
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    setAuth(token, userId) {
      this.token = token;
      this.userId = userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    },

    async fetchProfile() {
      if (!this.token || !this.userId) return;
      try {
        const res = await api.get("/me");
        this.user = res.data;
      } catch (err) {
        console.error("Lỗi fetchProfile:", err);
        this.logout();
      }
    },

    logout() {
      this.token = null;
      this.userId = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});
