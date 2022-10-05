import React, { FC, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthContext } from '../../context/AuthContext';

interface UserInfoProps {

};

const UserInfo: FC<UserInfoProps> = () => {
    const { user, logOut, changeDisplayName } = useAuthContext();
    const [displayNamePlaceholder, setDisplayNamePlaceholder] = useState(user?.displayName ?? 'Nombre de usuario');
    const nameRef = useRef<HTMLInputElement>(null);

    const changeName = async () => {
        await changeDisplayName(nameRef.current?.value || user.displayName!);
        toast('Name changed successfully', {
            type: 'success',
            containerId: 'A',
            theme: 'colored',
            icon: () => (<MdModeEditOutline size={40} />),
            pauseOnFocusLoss: false
        });
        toast.clearWaitingQueue();
        setDisplayNamePlaceholder(nameRef.current?.value || user.displayName!);
    };

    return (
        <div className='flex w-full flex-col gap-8'>
            <Input endDecorator={
                <IoMdSend className='cursor-pointer' size={30} onClick={changeName}/>
            } label='Display Name' myRef={nameRef} placeholder={displayNamePlaceholder} />
            <Button className='w-full' text='Log Out' onClick={logOut}/>
        </div>
    );
};

export default UserInfo;
