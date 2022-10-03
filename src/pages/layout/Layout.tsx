import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
}

const Layout: FC<LayoutProps> = () => {
    return (

        <div className='bg-main flex h-full min-h-screen w-full items-center justify-center'>
            <Outlet />
        </div>
    );
};

export default Layout;
