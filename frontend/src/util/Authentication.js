import { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { AxiosGet } from "./Axios";

// test if user is logged in (has JWT token)
const Authentication = ({ callbackURL, type }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        AxiosGet('/api/auth').then((response) => {
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