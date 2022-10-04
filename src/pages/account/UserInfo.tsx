import React, { FC, useEffect, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthContext } from '../../context/AuthContext';

interface UserInfoProps {

};

const UserInfo: FC<UserInfoProps> = () => {
    const { user, logOut, changeDisplayName } = useAuthContext();
    const nameRef = useRef<HTMLInputElement>(null);

    const changeName = () => {
        changeDisplayName(nameRef.current?.value || user.displayName!);
    };

    useEffect(() => {
        console.log(user.displayName);
    }, [user.displayName]);

    return (
        <div className='flex w-full flex-col gap-8'>
            <Input endDecorator={
                <IoMdSend className='cursor-pointer' size={30} onClick={changeName}/>
            } myRef={nameRef} placeholder={user.displayName ?? 'Nombre de usuario'} />
            <Button className='w-full' text='Log Out' onClick={logOut}/>
        </div>
    );
};

export default UserInfo;
