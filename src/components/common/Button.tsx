import clsx from 'clsx';
import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
}

const Button: FC<ButtonProps> = ({ text, className, children, ...props }) => {
    return (
        <button className={clsx('main-card h-20 select-none py-2 uppercase', className)} {...props}>
            {text || children}
        </button>
    );
};

export default Button;
