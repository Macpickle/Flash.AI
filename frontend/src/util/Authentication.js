import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
;

// test if user is logged in (has JWT token)
const Authentication = ({ callbackURL, type }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.get(`${process.env.API_URL}/api/auth/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.data.success) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }).catch((error) => {
            setIsAuthenticated(false);
        });
    }, [token]);

    if (isAuthenticated === null) {
        return <></>;
    }
    if (type === "noauth" && isAuthenticated) {
        return <Navigate to={callbackURL} />;
    }

    if (type === "auth" && !isAuthenticated) {
        return <Navigate to={callbackURL} />;
    }

    return <Outlet />;
}

export default Authentication;