import clsx from 'clsx';
import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
}

const Button: FC<ButtonProps> = ({ text, className, children, ...props }) => {
    return (
        <button className={clsx('main-card', 'relative h-20 min-w-full cursor-pointer select-none py-2 uppercase', className)} {...props}>
            {text}
            {children}
        </button>
    );
};

export default Button;
