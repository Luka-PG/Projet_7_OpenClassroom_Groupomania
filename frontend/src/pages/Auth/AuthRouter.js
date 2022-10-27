// import des modules necessaire
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Login, Signup } from '@/pages/Auth/index'
import Error from '@/_utils/Error'

// fonction de routage d'authentification
const AuthRouter = () => {
    return (

        <Routes>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path="*" element={<Error />} />

        </Routes>



    );
};
// export du sous routage pour le router principal
export default AuthRouter;