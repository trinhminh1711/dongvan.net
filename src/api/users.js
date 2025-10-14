import axiosClient from "./axios";

const API_URL = "/profile";

export const getUserInfo = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getPostUserInfo = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-info/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const changePassword = async (payload) => {
    try {        
        const res = await axiosClient.post(`${API_URL}/change-password`, payload);
        return res.data; // trả về dữ liệu từ server
    } catch (err) {
        // ném lỗi ra ngoài để component xử lý
        return err.response?.data || { message: "Lỗi kết nối server" };
    }
}

export const updateUserInfo = async (payload) => {
  try {
    const isFormData = payload instanceof FormData;

    const res = await axiosClient.put(`${API_URL}/update-info`, payload, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Lỗi kết nối server" };
  }
};


