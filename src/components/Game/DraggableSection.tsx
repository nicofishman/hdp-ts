import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';

interface DraggableSectionProps extends HTMLAttributes<HTMLDivElement> {
    numberOfCards?: number;
};

const DraggableSection: FC<DraggableSectionProps> = ({ className, numberOfCards, ...props }) => {
    // change width based on number of cards
    const width = numberOfCards ? (numberOfCards * 40) + (numberOfCards * 4) : 40;

    return (
        <div className={clsx('h-60 border-spacing-5 border-2 border-dashed border-black p-2', className)} style={{ width: `${width * 4}px` }} {...props}>
            DraggableSection
        </div>
    );
};

export default DraggableSection;
