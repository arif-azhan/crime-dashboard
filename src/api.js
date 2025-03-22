import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this when deploying

export const fetchCrimeHeatmap = async (queryParams = "") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/crime-heatmap?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching crime heatmap:", error);
        return null;
    }
};

export const fetchCrimeTrends = async () => {
    const response = await axios.get(`${API_BASE_URL}/crime-trends`);
    return response.data;
};

export const fetchMostAffectedStates = async () => {
    const response = await axios.get(`${API_BASE_URL}/most-states`);
    return response.data;
};

export const fetchCrimeType = async () => {
    const response = await axios.get(`${API_BASE_URL}/crime-distribution`);
    return response.data;
};

export const fetchCrimeRateChange = async () => {
    const response = await axios.get(`${API_BASE_URL}/crime-rate-change`);
    return response.data;
};
