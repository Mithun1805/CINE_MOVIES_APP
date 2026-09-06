
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});

// Get CSRF token from cookie
export const getCsrfToken = () => {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split("=");

        if (key === "csrftoken") {
            return decodeURIComponent(value);
        }
    }

    return null;
};

// Automatically attach CSRF token to POST/PUT/PATCH/DELETE requests
api.interceptors.request.use((config) => {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
});

export default api;

