// src/services/chatgptService.js
import axios from 'axios';

const chatgptApi = axios.create({
    baseURL: 'http://localhost:8000/playground/api/generate_code', 
})

export const getGeneratedCode = async (input) => {
    try {
        const response = await chatgptApi.post('/', { input });
        return response.data;
    } catch (error) {
        console.error('Error communicating with ChatGPT API:', error);
        throw error;
    }
};
