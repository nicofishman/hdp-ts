import clsx from 'clsx';
import React, { FC, InputHTMLAttributes, ReactNode, RefObject } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    myRef?: RefObject<HTMLInputElement>
};

const Input: FC<InputProps> = ({ placeholder, myRef, startDecorator, endDecorator, className, ...props }) => {
    return (
        <div className={clsx('relative', className)}>
            <input ref={myRef} className={clsx('main-card h-full w-full px-4 outline-none',
                startDecorator && 'pl-12', endDecorator && 'pr-12'
            )} placeholder={placeholder} {...props} />
            {
                startDecorator && (
                    <div className={'relative left-2 top-[10%] h-10 w-10 translate-y-[50%] text-gray-500'}>
                        {startDecorator}
                    </div>
                )
            }
            {
                endDecorator && (
                    <div className={'absolute right-2 top-[20%] h-10 w-10 text-gray-500'}>
                        {endDecorator}
                    </div>
                )
            }
        </div>
    );
};

export default Input;