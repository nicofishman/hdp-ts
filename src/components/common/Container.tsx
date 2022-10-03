import clsx from 'clsx';
import React, { FC, HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
};

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div className={clsx('main-card min-h-full w-full', className)} {...props}>
            {children}
        </div>
    );
};

export default Container;
