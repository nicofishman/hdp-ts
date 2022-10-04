import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoSettingsSharp, IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

interface HomeProps {

};

const Home: FC<HomeProps> = () => {
    const searchGameRef = useRef<HTMLInputElement>(null);
    const [t] = useTranslation('global');

    const handleSearchGameClick = () => {
        console.log(searchGameRef.current?.value);
    };

    const handleToast = () => {
        toast('Logged out scuccessfully', {
            type: 'success',
            containerId: 'A',
            position: 'top-right',
            theme: 'light'
        });
    };

    return (
        <div className='flex w-full flex-col gap-4'>
            <div className='flex w-full flex-col gap-4 md:flex-row'>
                <div className='flex-1'>
                    <Button className='w-full' text={t('create')} onClick={handleToast} />
                </div>
                <div className='flex-1'>
                    <Input className='h-20' endDecorator={
                        <AiOutlineSearch className={'mt-2 h-full w-full'} onClick={handleSearchGameClick} />
                    } myRef={searchGameRef} placeholder={t('search')}/>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-16 lg:gap-4'>
                <Link to={'/settings'}>
                    <Button className='h-20 w-20'>
                        <IoSettingsSharp className={'h-full w-full fill-pink transition-all duration-1000 hover:rotate-90 dark:fill-light-pink dark:hover:fill-pink'} />
                    </Button>
                </Link>
                <Link to={'/account'}>
                    <Button className='h-20 w-20'>
                        <IoPerson className={'h-full w-full fill-pink transition-all dark:fill-light-pink'} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
