import axiosClient from "./axios";

const API_URL = "/chapter";

export const getLastChapter = async (story_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${story_id}/${"last-chapter"}`);
        return res.data
    } catch (err) {
       return err
    }
};

export const updateMarkReadChapter = async (story_id , chapter_id, user_id) => {
    try {
        const res = await axiosClient.post(`${API_URL}/${story_id}/${"mark-read"}/${chapter_id}`,
            {user_id}
        ); 
        return res.data
    } catch (err) {
       return err
    }
};


export const getTopUserRead= async (limit) => {
    try {
        const res = await axiosClient.get(`${API_URL}/top-readers?limit=${limit}"}`,
        ); 
        return res.data
    } catch (err) {
       return err
    }
};

export const getChapterWithId = async (story_id, chapter_id, user_id) => {
    try {
        const res = await axiosClient.get(`${API_URL}/${story_id}/${"chapter"}/${chapter_id}/${"user"}/${user_id}`);
        return res.data
    } catch (err) {
       return err
    }
};

export const getListChapterUpdate = async () => {
    try {
        const res = await axiosClient.get(`${API_URL}/list/lastest-chapter`);
        return res.data
    } catch (err) {
       return err
    }
};

export const postNewChapter = async (chapter_content) => {
    try {
        const res = await axiosClient.post(`${API_URL}` , chapter_content , {
      headers: {
        "Content-Type": "application/json"
      }
    });
        return res.data
    } catch (err) {
       return err
    }
};