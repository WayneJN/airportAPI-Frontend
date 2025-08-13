import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const pluralMap = {
    flight: 'flights',
    passenger: 'passengers',
    airport: 'airports',
    aircraft: 'aircraft',
    airline: 'airlines',
    gate: 'gates',
    city: 'cities'
};


export const getEntityById = async (entityType, id) => {
    const plural = pluralMap[entityType] || entityType;
    const response = await axios.get(`${BASE_URL}/${plural}/${id}`);
    return response.data;
};


export const updateEntity = async (entityType, id, data) => {
    const plural = pluralMap[entityType] || entityType;
    return await axios.put(`${BASE_URL}/${plural}/${id}`, data);
};


export const getDropdownOptions = async (entityType) => {
    const plural = pluralMap[entityType] || entityType;
    const response = await axios.get(`${BASE_URL}/${plural}`);
    return response.data;
};

