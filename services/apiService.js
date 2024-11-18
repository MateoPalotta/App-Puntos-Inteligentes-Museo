import axios from 'axios';

const API_URL = 'http://192.168.1.39:5000/api/museums'; // Ajusta esta URL según tu configuración

export const getMaps = async () => {
    try {
        const response = await axios.get(`${API_URL}/maps`);
        return response.data;
    } catch (error) {
        console.error("Error fetching maps:", error.response?.data || error.message);
        throw error;
    }
};

export const getRoutes = async () => {
    try {
        const response = await axios.get(`${API_URL}/routes`);
        return response.data;
    } catch (error) {
        console.error("Error fetching routes:", error.response?.data || error.message);
        throw error;
    }
};