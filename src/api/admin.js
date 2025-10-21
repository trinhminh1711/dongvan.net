import axiosClient from "./axios";
const API_URL = "/admin";
export const getAllUsers = async () => {
  const res = await axiosClient.get(`${API_URL}/users`);
  return res.data;
};

// Cấm hoặc vô hiệu hóa người dùng (deny user)
export const denyUser = async (userId) => {
  const res = await axiosClient.put(`${API_URL}/users/${userId}/deny`);
  return res.data;
};

// Mở khóa hoặc khôi phục user
export const restoreUser = async (userId) => {
  const res = await axiosClient.put(`${API_URL}/users/${userId}/restore`);
  return res.data;
};

// Xóa vĩnh viễn (nếu cho phép)
export const deleteUser = async (userId) => {
  const res = await axiosClient.delete(`${API_URL}/users/${userId}`);
  return res.data;
};

export const getPaymentHistory = async () => {
  const res = await axiosClient.get(`${API_URL}/payments`);
  return res.data;
};

// ========================
// ⚙️ CÁC TÁC VỤ KHÁC (tuỳ chọn)
// ========================

// Cập nhật role user (ví dụ promote thành admin)
export const updateUserRole = async (userId, role) => {
  const res = await axiosClient.put(`${API_URL}/users/${userId}/role`, { role });
  return res.data;
};
export const getAllPublishedStories = async () => {
  const res = await axiosClient.get(`/stories/stories/published`);
  return res.data;
};
export const updateStoryStatus = async (storyId, status) => {
  try {
    const res = await axiosClient.put(`/stories/update/${storyId}/status`, { status })
    return res.data
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Lỗi khi gọi API' }
  }
}