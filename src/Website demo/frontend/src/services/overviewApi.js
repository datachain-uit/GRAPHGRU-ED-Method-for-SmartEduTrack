import api from './api';

export const getOverviewData = async () => {
  try {
    const response = await api.get('/overview/');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu overview:', error);
    throw error;
  }
};