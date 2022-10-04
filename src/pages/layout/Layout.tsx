import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { getTheme } from '../../utils/theme';

interface LayoutProps {
}

const Layout: FC<LayoutProps> = () => {
    return (
        <div className='bg-main flex h-full min-h-screen w-full items-center justify-center'>
            <ToastContainer
                autoClose={3000}
                containerId='A'
                draggable={true}
                hideProgressBar={true}
                limit={1}
                position='top-right'
                theme={getTheme() ? 'dark' : 'light'}
            />
            <Outlet />
        </div>
    );
};

export default Layout;
