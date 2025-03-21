import { fetchData, postData } from './apiService';

const handleError = (error) => {
    try {
        const parsedError = JSON.parse(error.message);
        return parsedError;
    } catch {
        return new Error(error.message || "An unknown error occurred.");
    }
};

export const apiAdminLogin = async (data) => {
    try {
        const result = await postData(`/public/api/v1/admin/login`, data);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiGetAdminDetails = async () => {
    try {
        const result = await fetchData(`/api/v1/admin/get-profile`, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiGetAdminDashboard = async () => {
    try {
        const result = await fetchData(`/api/v1//admin/dashboards`, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiGetAdminList = async (data) => {
    try {
        const result = await fetchData(`/api/v1/admin/admin-list`, true, data);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiAdminDetails = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/details`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiUpdateAdmin = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/update-admin`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiDeleteAdmin = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/delete-admin`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiRegisterAdmin = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/register`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiUserPoliciesByType = async (data) => {
    try {
        const result = await postData(`/public/api/v1/general/policies-info`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiUserPoliciesList = async () => {
    try {
        const result = await fetchData(`/api/v1/admin/get-policies`, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiUserPoliciesUpdate = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/edit-policies`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiGetInquiryList = async () => {
    try {
        const result = await fetchData(`/api/v1/admin/get-inquiry`, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiDeleteInquiry = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/delete-inquiry`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiInquiryStatusUpdate = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/update-inquiry-status`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};

export const apiInquiryQuotationUpdate = async (data) => {
    try {
        const result = await postData(`/api/v1/admin/update-inquiry-quotation`, data, true);
        return result;
    } catch (error) {
        throw handleError(error);
    }
};