import api from "./api";

export const getMentorHistory = async () => {
    const { data } = await api.get("/mentor/history");
    return data;
};

export const chatWithMentor = async (message) => {
    const { data } = await api.post("/mentor/chat", {
        message,
    });

    return data;
};

export const clearMentorHistory = async () => {
    const { data } = await api.delete("/mentor/history");
    return data;
};