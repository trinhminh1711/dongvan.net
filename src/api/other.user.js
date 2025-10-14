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
