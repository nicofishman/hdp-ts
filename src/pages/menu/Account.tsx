import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button';
import { useAuthContext } from '../../context/AuthContext';
import LogIn from '../account/LogIn';
import UserInfo from '../account/UserInfo';

interface AccountProps {

};

const Account: FC<AccountProps> = () => {
    const { user } = useAuthContext();
    const { t } = useTranslation('global');

    return (
        <div className='mx-0 flex flex-col items-center gap-6 md:mx-[10%] lg:mx-[10%] xl:mx-[15%]'>
            <Link className='w-full' to='/'>
                <Button className='group flex h-12 w-full items-center justify-center text-4xl' text={t('goback')}>
                    <div className='absolute top-1 left-4 transition-transform duration-200 group-hover:-translate-x-3'>
                        <IoChevronBack/>
                    </div>
                </Button>
            </Link>
            {
                !(user.uid)
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
