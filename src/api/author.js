import axiosClient from "./axios";

const API_URL = "/author";
export const voteStory = async (userId, storyId, coins) => {
    try {
        const res = await axiosClient.post(`${API_URL}/recommendation/story`, { userId, storyId, coins });
        // trả nguyên response.data để component dùng
        return { success: true, status: res.status, data: res.data };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                data: error.response.data
            };
        }
        return { success: false, status: 500, data: { message: "No response" } };
    }
};
export const getVoteStory = async (story_id, userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/recommendation/story/${story_id}/user/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const rateStory = async (storyId, userId, rating, comment) => {
    try {
        const res = await axiosClient.post(`${API_URL}/stories/${storyId}/rating`, {
            userId,
            rating,
            comment
        });
        return { success: true, status: res.status, data: res.data };
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                status: error.response.status,
                data: error.response.data
            };
        }
        return { success: false, status: 500, data: { message: "No response" } };
    }
};
export const getStoryRate = async (storyId) => {
    const res = await axiosClient.get(`${API_URL}/stories/${storyId}/comments`);
    return res.data;
};

export const fetchTransactions = async (userId, paramsDate) => {
    const res = await axiosClient.get(`${API_URL}/transaction/${userId}`,
        { params: paramsDate }
    );
    return res.data;
};


export const giveSupport = async (fromUserId, toUserId, coins, message) => {
    try {

        const res = await axiosClient.post(`${API_URL}/give/gift-story`, {
            from_user_id: fromUserId,
            to_user_id: toUserId,
            coins,
            message
        });
        return { success: true, status: res.status, data: res.data };
    } catch (error) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data
        };
    }
};