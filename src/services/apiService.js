import axiosInstance from './axiosInstance';

const getToken = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return token ? `Bearer ${token}` : '';
};

export const fetchData = async (url, auth = false, data = {}) => {
    try {
        const headers = auth ? { Authorization: getToken() } : {};
        const response = await axiosInstance.get(url, { headers, ...data });
        return response.data;
    } catch (error) {
        if (error.response) {
            const errorData = error.response.data;
            throw new Error(JSON.stringify(errorData));
        }
        throw new Error(error.message);
    }
};

export const postData = async (url, data, auth = false) => {
    try {
        const headers = auth ? { Authorization: getToken() } : {};
        const response = await axiosInstance.post(url, data, { headers });
        return response.data;
    } catch (error) {
        if (error.response) {
            const errorData = error.response.data;
            throw new Error(JSON.stringify(errorData));
        }
        throw new Error(error.message);
    }
};
