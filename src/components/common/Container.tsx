import React, { FC, HTMLAttributes, ReactNode } from 'react';

import { cn } from '../../utils/cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn('main-card w-full', className)} {...props}>
            {children}
        </div>
    );
};

export default Container;
