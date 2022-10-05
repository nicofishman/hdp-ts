import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    Outlet,
    RouterProvider
} from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import AuthProvider from './context/AuthContext';
import './index.css';
import Cards from './pages/Cards';
import Index from './pages/Index';
import Layout from './pages/layout/Layout';
import Account from './pages/menu/Account';
import Home from './pages/menu/Home';
import Settings from './pages/menu/Settings';
import 'react-toastify/dist/ReactToastify.css';
import i18n from './lang/i18n';

const isDark = window.localStorage.getItem('theme') === 'dark';
const lang = window.localStorage.getItem('lang') || 'es';

i18n.changeLanguage(lang);

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthProvider>
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <div className={clsx('layout', isDark && 'dark')}>
                    <Layout />
                </div>
            </AuthProvider>
        ),
        children: [
            {
                path: '/cards',
                element: <div><Outlet/></div>,
                children: [
                    {
                        path: 'es',
                        element: <Cards lang='es' />
                    },
                    {
                        path: 'en',
                        element: <Cards lang='en' />
                    }
                ]
            },
            {
                path: '/',
                element: <Index />,
                children: [
                    {
                        path: '/',
                        element: <Home />
                    },
                    {
                        path: 'settings',
                        element: <Settings />
                    },
                    {
                        path: 'account',
                        element: <Account />
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <RouterProvider router={router} />
        </I18nextProvider>
    </React.StrictMode>
);
