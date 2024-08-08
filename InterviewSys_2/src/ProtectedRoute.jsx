import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function ProtectedRoute({ children }) {
    const [cookies] = useCookies(['user']);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (cookies.user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, [cookies]);

    if (isLoading) {
        // While loading, render nothing or a loading spinner
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If not authenticated, redirect to login
        return <Navigate to="/" replace />;
    }

    // If authenticated, render the children components
    return children;
}

export default ProtectedRoute;
