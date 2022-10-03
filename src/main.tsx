import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import './index.css';
import Cards from './pages/Cards';
import Index from './pages/Index';
import Layout from './pages/layout/Layout';
import Home from './pages/menu/Home';
import Settings from './pages/menu/Settings';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className=''>
                <Layout />
            </div>
        ),
        children: [
            {
                path: '/cards',
                element: <Cards />
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
                    }
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
