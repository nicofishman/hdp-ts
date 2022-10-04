import React, { FC, useState } from 'react';
import { AiOutlineGoogle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

interface LogInProps {

};

const LogIn: FC<LogInProps> = () => {
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <div className='flex w-full select-none flex-col items-center'>
            <Button className='h-16 w-16'>
                <AiOutlineGoogle size={50}/>
            </Button>
            <h1 className='py-3 text-2xl font-bold'>— OR —</h1>
            <div className='flex flex-col gap-4'>

                <Input className='h-14' placeholder='Email' />
                <Input className='h-14' endDecorator={
                    passwordVisible
                        ? (
                            <AiFillEye className='h-full w-full fill-black dark:fill-gray-300' onClick={() => setPasswordVisible(!passwordVisible)} />
                        )
                        : (
                            <AiFillEyeInvisible className='h-full w-full fill-black dark:fill-gray-300' onClick={() => setPasswordVisible(!passwordVisible)} />
                        )
                } placeholder='Password' type={passwordVisible ? 'text' : 'password'} />
                <Button className='h-14' text='Log In' />
            </div>
        </div>
    );
};

export default LogIn;
