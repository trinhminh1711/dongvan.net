// src/api/mail.js
import axiosClient from "./axios";

const API_URL = "/mail";

export const sendMail = (data) => {
  return axiosClient.post(`${API_URL}/send`, data);
};

export const createSupportRequest = async (formData) => {
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const res = await axiosClient.post(`${API_URL}/support/request`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu hỗ trợ:", error);
    throw error.response?.data || error;
  }
};

export const createRequest = async (user_id, amount, coin) => {
  const res =  await axiosClient.post(`${API_URL}/transactions/request`, {
    user_id: user_id, // thay bằng user đang đăng nhập
    amount: amount,
    coin: coin
  });
  return res.data
};

export const getTransactions = async (page, startDate = null, endDate = null) => {
  try {
    const params = { page };

    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const res = await axiosClient.get(`${API_URL}/payment/request`, { params });
    return res.data // trả về dữ liệu từ API
  } catch (error) {
    console.error("Lỗi khi lấy transactions:", error);
    throw error;
  }
};

export const approveTransaction = async (id) => {
  try {
    const res = await axiosClient.put(`${API_URL}/transactions/${id}/approve`);
    console.log("Kết quả duyệt:", res.data);
    return res.data;
  } catch (error) {
    console.error("Lỗi duyệt giao dịch:", error);
    throw error;
  }
};