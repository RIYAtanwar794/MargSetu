import api from "./api";

export const getProfile = async () => {
    const { data } = await api.get("/profile");
    return data;
};

export const updateProfile = async (profileData) => {
    const { data } = await api.put("/profile", profileData);
    return data;
};

export const uploadPhoto = async (formData) => {
    const { data } = await api.post("/profile/photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};

export const uploadResume = async (formData) => {
    const { data } = await api.post("/profile/resume", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};