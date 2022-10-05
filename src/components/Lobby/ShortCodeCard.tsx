import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiClipboard } from 'react-icons/bi';
import { toast } from 'react-toastify';

import Container from '../common/Container';

interface ShortCodeCardProps {
    code: string;
};

const ShortCodeCard: FC<ShortCodeCardProps> = ({ code }) => {
    const [isShown, setIsShown] = useState(false);
    const { t } = useTranslation('global');

    return (
        <Container className='flex w-full flex-col items-center'>
            <h1 className='font-main text-2xl font-light'>{t('code')}</h1>
            <div className="flex flex-row items-center gap-2">
                <div className="flex w-1/2 justify-end">
                    <span className='font-main text-2xl'>{isShown ? code : '•'.repeat(code.length)}</span>
                </div>
                <div className="flex w-1/2 flex-row items-center gap-2">
                    {
                        isShown
                            ? (
                                <AiFillEye className='h-6 w-6 cursor-pointer fill-black dark:fill-gray-300' onClick={() => setIsShown(!isShown)} />
                            )
                            : (
                                <AiFillEyeInvisible className='h-6 w-6 cursor-pointer fill-black dark:fill-gray-300' onClick={() => setIsShown(!isShown)} />
                            )
                    }
                    <BiClipboard className='h-6 w-6 cursor-pointer fill-black dark:fill-gray-300' onClick={() => {
                        navigator.clipboard.writeText(code)
                            .then(() => {
                                toast(t('codecopied'), {
                                    type: 'success',
                                    containerId: 'A',
                                    theme: 'colored',
                                    icon: '📋',
                                    pauseOnFocusLoss: false
                                });
                                toast.clearWaitingQueue();
                            });
                    }} />
                </div>
            </div>
        </Container>
    );
};

export default ShortCodeCard;
