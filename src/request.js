import axios from 'axios';

const URL = 'http://api.convini.ec:3002/api';
const DEV_URL = 'http://localhost:3002/api';

export const insert = async (data) => axios.post(`${DEV_URL}/user`, data, { headers: { 'Content-Type': 'application/json' }});

export const insertProduct = async (data) => axios.post(`${DEV_URL}/product`, data, { headers: { 'Content-Type': 'application/json' }});

export const select = () => axios.get(`${DEV_URL}/user`);

export const selectProduct = () => axios.get(`${DEV_URL}/product`);