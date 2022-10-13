import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import LogoLight from '../public/img/LogoLight.png';
import LogoDark from '../public/img/LogoDark.png';

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
        <div className='flex h-auto w-full flex-col items-center justify-center px-5 lg:w-[40%] lg:p-0'>
            <div className='flex w-full flex-[0.5] md:flex-[0.7] lg:flex-[0.95]'>
                <div className="flex w-full select-none self-end">
                    <img className={'h-full w-full'} src={isDark ? LogoDark : LogoLight}/>
                </div>
            </div>
            <div className='w-full flex-1 items-start pt-10'>
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
