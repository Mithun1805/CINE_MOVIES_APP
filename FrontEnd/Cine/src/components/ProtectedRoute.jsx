import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./forms/Axios";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                await api.get("/me/");
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;