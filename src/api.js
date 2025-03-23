import axios from "axios";

const API_BASE_URL = "http://localhost:5050"; // Change this when deploying

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

export const fetchMostAffectedDistricts = async (queryParams = "") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/most-districts?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching most affected districts:", error);
        return null;
    }
};

export const fetchCrimeType = async (queryParams = "") => {
    try {
        const response = await axios.get(`${API_BASE_URL}/crime-distribution?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching crime distribution:", error);
        return null;
    }
};

export const fetchCrimeRateChange = async () => {
    const response = await axios.get(`${API_BASE_URL}/crime-rate-change`);
    return response.data;
};

export async function fetchFilters() {
    const res = await fetch("http://127.0.0.1:5050/api/filters");
    return res.json();
}
