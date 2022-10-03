import React, { FC, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoSettingsSharp, IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

interface HomeProps {

};

const Home: FC<HomeProps> = () => {
    const searchGameRef = useRef<HTMLInputElement>(null);

    const handleSearchGameClick = () => {
        console.log(searchGameRef.current?.value);
    };

    return (
        <div className='flex w-full flex-col gap-4'>
            <div className='flex flex-col gap-4 md:flex-row'>
                <Button className='flex-1' text={'Crear Juego'} />
                <Input className='h-20 flex-1' endDecorator={
                    <AiOutlineSearch className={'h-full w-full'} onClick={handleSearchGameClick} />
                } myRef={searchGameRef} placeholder='Buscar Juego'/>
            </div>
            <div className='flex flex-row justify-center gap-16 lg:gap-4'>
                <Link to={'/settings'}>
                    <Button className='h-auto w-auto'>
                        <IoSettingsSharp className={'h-full w-full fill-pink transition-all duration-1000 hover:rotate-90 dark:fill-light-pink'} />
                    </Button>
                </Link>
                <Link to={'/profile'}>
                    <Button className='h-auto w-auto'>
                        <IoPerson className={'h-full w-full fill-pink transition-all dark:fill-light-pink'} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
