import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

    headers: {
        'Content-Type': 'application/json',
    },
});

// ==============================
// REQUEST INTERCEPTOR
// Tu dong gan JWT vao request
// ==============================
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('crs_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ==============================
// RESPONSE INTERCEPTOR
// Xu ly token het han / token sai
// ==============================
axiosClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;

            const token = localStorage.getItem('crs_token');

            // JWT hop le thuong co 3 phan:
            // header.payload.signature
            const invalidToken =
                !!token && token.split('.').length !== 3;

            /*
             * 401:
             * Token het han / token khong hop le
             *
             * 403 + invalidToken:
             * Backend hien tai cua project tra 403
             * khi token rac nhu "abc123"
             *
             * KHONG logout voi moi loi 403,
             * vi 403 con co the la dang nhap dung
             * nhung khong du quyen.
             */
            if (
                status === 401 ||
                (status === 403 && invalidToken)
            ) {
                localStorage.removeItem('crs_token');
                localStorage.removeItem('crs_user');

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;