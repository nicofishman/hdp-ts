import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import LogoLight from '../public/img/LogoLight.svg';
import LogoDark from '../public/img/LogoDark.svg';

interface IndexProps {

}

const Index: FC<IndexProps> = () => {
    const isDark = window.localStorage.getItem('theme') === 'dark';

    return (
        <div className='w-full flex-col px-5 lg:w-[50%] lg:p-0'>
            <img alt={'Logo'} className={'h-full w-full'} src={isDark ? LogoDark : LogoLight} />
            <div className='mt-10 w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Index;
