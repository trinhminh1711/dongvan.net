import axiosClient from "./axios";

const API_URL = "/forum";
export const createPost = async (postData) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/create-post`,postData);
        return res.data
    } catch (err) {
       return err
    }
};
export const getPost = async (TopicId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/get-post`);
        return res.data
    } catch (err) {
       return err
    }
};
export const getPostForumByTopic = async (TopicId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/category/${TopicId}`);
        return res.data
    } catch (err) {
       return err
    }
};
export const getPostDetail = async (post_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/post-forum/post-detail/${post_id}`);
        return res.data
    } catch (err) {
       return err
    }
}

export const addPostComment = async (post_id, user_id, content) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/comment/add`, {
            post_id: post_id,          // id của story
            user_id: user_id,          // id user đang login
            content: content // nội dung comment
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const increaseLikePostComment = async (comment_id) => {
    try {
        const res = await axiosClient.post(`${API_URL}/post-forum/comment/add-like`, {
            comment_id: comment_id 
        });
        return res.data
    } catch (err) {
        return err
    }
};