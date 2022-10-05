import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineGoogle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuthContext } from '../../context/AuthContext';

interface LogInProps {

};

const LogIn: FC<LogInProps> = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { signInWithGoogle, mySignInWithEmailAndPassword } = useAuthContext();
    const { t } = useTranslation('global');
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const logInEmailAndPassword = async () => {
        if (emailRef.current && passwordRef.current) {
            await mySignInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
            console.log('LogIn.tsx: logInEmailAndPassword: mySignInWithEmailAndPassword: OK');
        }
    };

    return (
        <div className='flex w-full select-none flex-col items-center'>
            <Button className='h-16 w-16' onClick={signInWithGoogle} >
                <AiOutlineGoogle size={50}/>
            </Button>
            <h1 className='py-3 text-2xl font-bold'>— OR —</h1>
            <div className='flex w-full flex-col gap-4'>

                <Input className='h-14 w-full' myRef={emailRef} placeholder={t('email')} />
                <Input className='h-14 w-full' endDecorator={
                    passwordVisible
                        ? (
                            <AiFillEye className='h-full w-full fill-black dark:fill-gray-300' onClick={() => setPasswordVisible(!passwordVisible)} />
                        )
                        : (
                            <AiFillEyeInvisible className='h-full w-full fill-black dark:fill-gray-300' onClick={() => setPasswordVisible(!passwordVisible)} />
                        )
                } myRef={passwordRef} placeholder={t('password')} type={passwordVisible ? 'text' : 'password'} />
                <Button className='h-14 w-full' text={t('login')} onClick={logInEmailAndPassword} />
            </div>
        </div>
    );
};

export default LogIn;
