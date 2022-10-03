import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import LogoLight from '../public/img/LogoLight.svg';
import LogoDark from '../public/img/LogoDark.svg';

interface IndexProps {

}

const Index: FC<IndexProps> = () => {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        setIsDark(window.localStorage.getItem('theme') === 'dark');
        window.addEventListener('storage', () => {
            if (window.localStorage.getItem('theme') === 'dark') {
                setIsDark(true);
            } else {
                setIsDark(false);
            }
        });
    }, []);

    return (
        <div className='w-full flex-col px-5 lg:w-[40%] lg:p-0'>
            <img className={'h-full w-full'} src={isDark ? LogoDark : LogoLight}/>
            <div className='mt-10 w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
