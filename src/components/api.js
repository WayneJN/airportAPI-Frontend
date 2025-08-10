import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Adjust if needed

export const getEntityById = async (entityType, id) => {
    const endpoint = entityType === 'passenger' ? `/passengers/${id}` : `/${entityType}/${id}`;
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
};

export const updateEntity = async (entityType, id, data) => {
    const endpoint = entityType === 'passenger' ? `/passengers/${id}` : `/${entityType}/${id}`;
    return await axios.put(`${BASE_URL}${endpoint}`, data);
};

export const getDropdownOptions = async (entityType) => {
    const endpoint = entityType === 'passenger' ? `/passengers` : `/${entityType}`;
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
};
