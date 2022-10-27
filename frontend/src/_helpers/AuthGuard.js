// import des modules necessaire
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { accountService } from "@/_services/account.service";

// fonction de blocage de route
const AuthGuard = ({ children }) => {

    useEffect(() => {
    })

    if (!accountService.isLogged()) {
        return <Navigate to="auth/login" />

    }
    return children
};

export default AuthGuard;