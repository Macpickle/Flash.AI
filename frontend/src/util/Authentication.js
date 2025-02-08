import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";


// test if user is logged in (has JWT token)
const Authentication = ({callbackURL}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios.get("/api/auth/", {
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

    return isAuthenticated ? <Outlet /> : <Navigate to={callbackURL} />;
}

export default Authentication;