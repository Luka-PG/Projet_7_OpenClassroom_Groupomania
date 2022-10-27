// import des modules necessaires
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

// fonction d'appel du header et de la page
const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

// export du layout pour appel dans le router
export default Layout;