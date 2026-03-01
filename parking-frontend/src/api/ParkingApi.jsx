import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getAllSlots = () => api.get('/slots');
export const checkIn = (slotId, license) => api.post(`/slots/${slotId}/checkin`, { license });
export const checkOut = (slotId) => api.post(`/slots/${slotId}/checkout`);
export const getActiveRecord = (slotId) => api.get(`/slots/${slotId}/active`);