import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/problems",
});


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getProblems = () => API.get("/");

export const createProblem = (data) => API.post("/", data);

export const updateProblem = (id, data) =>
    API.put(`/${id}`, data);

export const deleteProblem = (id) =>
    API.delete(`/${id}`);

export const getRevisionQueue = () =>
    API.get("/revisions/queue");

export const getDueRevisions = () =>
    API.get("/revisions/due");

export const markAsRevised = (id) =>
    API.put(`/${id}/revise`);