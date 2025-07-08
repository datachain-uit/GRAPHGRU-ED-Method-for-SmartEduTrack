import api from './api';

export const getLearningData = async () => {
  try {
    const response = await api.get('/learning/');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu learning:', error);
    throw error;
  }
};