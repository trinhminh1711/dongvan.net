import axiosClient from "./axios";

const API_URL = "/stories";

export const createStory = async (data) => {

    try {
        const formData = new FormData();
        formData.append("title", data.storyName);
        formData.append("author_id", data.storyAuthor);
        formData.append("genres_id", data.storyGenre);
        formData.append("description", data.storyDesc);
        formData.append("link_forum", data.storyLinkForum);
        if (data.cover) {
            formData.append("cover", data.cover);
        }
        const res = await axiosClient.post(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 201 && res.data?.success) {
            return {
                success: true,
                id: res.data.id,
                message: res.data.message || "Tạo story thành công!",
            };
        } else {
            return {
                success: false,
                message: res.data?.message || "Tạo story thất bại!",
                error: res.data?.error || null,
            };
        }
    } catch (error) {
        console.error("Error creating story:", error);
        return {
            success: false,
            message: "Lỗi kết nối server!",
            error: error.response?.data || error.message,
        };
    };
}
export const updateStory = async (data, story_id) => {
    console.log(data);
    try {
        const formData = new FormData();
        formData.append("title", data.storyName);
        formData.append("genres_id", data.storyGenre);
        formData.append("description", data.storyDesc);
        formData.append("link_forum", data.storyLinkForum);
        if (data.cover) {
            formData.append("cover", data.cover);
        }
        const res = await axiosClient.put(`${API_URL}/edit-story/${story_id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (res.status === 201 && res.data?.success) {
            return {
                success: true,
                message: "Cập nhật thành công!",
            };
        } else {
            return {
                success: false,
                message: res.data?.message || "Tạo story thất bại!",
                error: res.data?.error || null,
            };
        }
    } catch (error) {
        console.error("Error creating story:", error);
        return {
            success: false,
            message: "Lỗi kết nối server!",
            error: error.response?.data || error.message,
        };
    };
}
export const getStory = async (authorId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${authorId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getStoryById = async (storyId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/story/${storyId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getStoryByCategory = async (categoryId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/category/${categoryId}`);
        return res.data
    } catch (err) {
        return err
    }
};
export const getStoryFullInfo = async (story_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/story-allinfo/${story_id}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const getStoryComment = async (story_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${story_id}/comments`);
        return res.data
    } catch (err) {
        return err
    }
};

export const updateUserReadingBook = async (userId, storyId, chapterId) => {
    try {
        const res = await axiosClient.post(`${API_URL}/story/reading`, {
            user_id: userId,
            story_id: storyId,
            chapter_id: chapterId
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const getListUserReading = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/user/reading/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
}

export const getListPostLike = async (userId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/favorite/${userId}`);
        return res.data
    } catch (err) {
        return err
    }
};

export const checkStoryLike = async (userId, storyId) => {
    try {
        const res = await axiosClient.get(`${API_URL}/check/storylike`, {
            params: {
                user_id: userId,
                story_id: storyId
            }
        });
        return res.data
    } catch (err) {
        return err
    }
};

export const addFavorite = async (userId, storyId) => {
    try {
        const res = await axiosClient.post(`${API_URL}/user-story/favorite`, {
            user_id: userId,
            story_id: storyId,
        });
        return res.data
    } catch (err) {
        return err
    }
};
