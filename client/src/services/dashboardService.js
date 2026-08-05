import api from "./api";

export const getDashboardCards = async () => {
    const { data } = await api.get("/dashboard/cards");
    return data;
};

export const getDashboardCharts = async () => {
    const { data } = await api.get("/dashboard/charts");
    return data;
};