import axios from 'axios';
import { routing } from '@/i18n/routing';

// Helper function để lấy locale từ URL pathname
const getLocaleFromPathname = (): string => {
    // Chỉ chạy ở client-side
    if (typeof window === 'undefined') {
        return routing.defaultLocale;
    }

    const pathname = window.location.pathname;
    // Locale là segment đầu tiên trong pathname (ví dụ: /vi/..., /en/...)
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    // Kiểm tra xem segment đầu tiên có phải là locale hợp lệ không
    if (firstSegment && routing.locales.includes(firstSegment as any)) {
        return firstSegment;
    }

    // Nếu không tìm thấy, trả về locale mặc định
    return routing.defaultLocale;
};

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Thêm token hoặc các headers khác nếu cần
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        // Thêm _locale vào query params
        const locale = getLocaleFromPathname();
        config.params = {
            ...(config.params || {}),
            _locale: locale,
        };

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Xử lý lỗi chung ở đây
        if (error.response?.status === 401) {
            // Xử lý unauthorized
            // Ví dụ: redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
