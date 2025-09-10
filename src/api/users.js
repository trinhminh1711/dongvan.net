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