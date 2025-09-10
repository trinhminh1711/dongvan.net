import axiosClient from "./axios";

const authService = {
  register: (data) => {
    return axiosClient.post("/auth/register", data);
  },

  login: (data) => {
    return axiosClient.post("/auth/login", data);
  },

  getProfile: () => {
    return axiosClient.get("/auth/profile");
  },
};

export default authService;
