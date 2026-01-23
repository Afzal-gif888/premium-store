const getApiUrl = () => {
    // 1. Explicitly set VITE_API_URL (Netlify/Production)
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    // 2. Local development fallback
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }

    // 3. Current origin (Production/Other)
    return window.location.origin;
};

export const API_BASE_URL = getApiUrl();
export const API_ENDPOINTS = {
    PRODUCTS: `${API_BASE_URL}/api/products`,
    ANNOUNCEMENTS: `${API_BASE_URL}/api/announcements`,
    UPLOAD: `${API_BASE_URL}/api/upload`,
    PAYMENTS: `${API_BASE_URL}/api/payments`,
};

export const getImageUrl = (path, options = {}) => {
    if (!path) return '';

    // Cloudinary dynamic resizing (saving bandwidth on mobile)
    if (path.includes('cloudinary.com') && (options.width || options.height)) {
        const parts = path.split('/upload/');
        if (parts.length === 2) {
            let transformation = `c_pad,b_white,q_auto:best,f_auto,dpr_auto,e_improve:vibrant,e_sharpen:50`;
            if (options.width) transformation += `,w_${options.width}`;
            if (options.height) transformation += `,h_${options.height}`;
            return `${parts[0]}/upload/${transformation}/${parts[1]}`;
        }
    }

    if (path.startsWith('http')) return path; // Already absolute
    if (path.startsWith('/uploads')) return `${API_BASE_URL}${path}`; // Local upload
    return path;
};
