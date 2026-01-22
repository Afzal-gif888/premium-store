const getApiUrl = () => {
    // Check for Vite env var (Production)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // Fallback for local development
    return 'http://localhost:5000';
};

export const API_BASE_URL = getApiUrl();
export const API_ENDPOINTS = {
    PRODUCTS: `${API_BASE_URL}/api/products`,
    ANNOUNCEMENTS: `${API_BASE_URL}/api/announcements`,
    UPLOAD: `${API_BASE_URL}/api/upload`,
    PAYMENTS: `${API_BASE_URL}/api/payments`,
};

export const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path; // Already absolute (Cloudinary)
    if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`; // Local upload
    return path;
};
