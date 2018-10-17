import axios from 'axios';

const URL = 'http://localhost:3002/api';

export const insert = async (data) => axios.post(`${URL}/user`, data, { headers: { 'Content-Type': 'application/json' }});

export const select = () => axios.get(`${URL}/user`);