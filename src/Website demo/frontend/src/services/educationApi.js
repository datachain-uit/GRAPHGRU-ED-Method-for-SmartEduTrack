import api from './api';

export const getEducationData = async () => {
  try {
    const response = await api.get('/education/');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu education:', error);
    throw error;
  }
};