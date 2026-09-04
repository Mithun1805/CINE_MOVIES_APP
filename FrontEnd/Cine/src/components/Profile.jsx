import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./forms/Axios";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get("/me/");
                setUser(response.data);
            } catch (error) {
                console.error("User fetch error:", error);
                navigate("/");
            }
        };

        getUser();
    }, [navigate]);

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const csrfResponse = await api.get("/csrf/");
            const csrfToken = csrfResponse.data.csrfToken;

            await api.delete("/delete-account/", {
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });

            alert("Account deleted successfully");
            navigate("/");
        } catch (error) {
            console.error("Delete account error:", error);
            alert("Failed to delete account");
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
    <div className="profile-container">
        <h1>My Profile</h1>

        <div className="profile-info">
            <h3>Username</h3>
            <p>{user.username}</p>
        </div>

        <div className="profile-info">
            <h3>Email</h3>
            <p>{user.email}</p>
        </div>

        <button
            className="delete-btn"
            onClick={handleDeleteAccount}
        >
            Delete Account
        </button>
    </div>
);
}

export default Profile;