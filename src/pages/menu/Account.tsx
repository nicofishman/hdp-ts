import React, { FC } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button';
import LogIn from '../account/LogIn';
import UserInfo from '../account/UserInfo';

interface AccountProps {

};

const Account: FC<AccountProps> = () => {
    const isLoggedIn = false;

    return (
        <div className='mx-0 flex flex-col items-center gap-6 lg:mx-[25%]'>
            <Link className='w-full' to='/'>
                <Button className='group flex h-12 w-full items-center justify-center' text='Volver'>
                    <div className='absolute top-1 left-4 transition-transform duration-200 group-hover:left-2'>
                        <IoChevronBack/>
                    </div>
                </Button>
            </Link>
            {
                !isLoggedIn
                    ? (
                        <LogIn />
                    )
                    : (
                        <UserInfo />
                    )
            }
        </div>
    );
};

export default Account;
