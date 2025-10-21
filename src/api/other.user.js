import axiosClient from "./axios";

const API_URL = "/users";
export const getUserInfomation = async (user_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/infomation/${user_id}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const updateUserStatus = async (userId, status) => {
  try {
    const res = await axiosClient.put(`${API_URL}/users/${userId}/status`, {
      status,
    });
    return res.data;
  } catch (err) {
    // Nếu server trả về lỗi
    if (err.response) {
      console.error("Lỗi response:", err.response.data);
      return err.response.data;
    }

    // Nếu lỗi do mạng hoặc request bị huỷ
    if (err.request) {
      console.error("Không có phản hồi từ server:", err.request);
      return { message: "Không thể kết nối đến server." };
    }

    // Lỗi không xác định
    console.error("Lỗi khác:", err.message);
    return { message: "Đã xảy ra lỗi không xác định." };
  }
};

