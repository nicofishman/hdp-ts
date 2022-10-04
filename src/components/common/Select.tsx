import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';

import Container from './Container';

interface SelectProps {
    mainOption: string;
    options: {value: string; text: string}[];
    startDecoration?: ReactElement;
    endDecoration?: ReactElement;
};

const Select: FC<SelectProps> = ({ mainOption, options, startDecoration, endDecoration }) => {
    return (
        <Container className='relative flex h-20 items-center justify-center'>
            {
                startDecoration && (
                    <div className='absolute left-2'>
                        {startDecoration}
                    </div>
                )
            }
            {
                endDecoration && (
                    <div className='absolute right-2'>
                        {endDecoration}
                    </div>
                )
            }
            <select className={clsx('bg-main h-full w-full cursor-pointer appearance-none rounded-lg border-none p-2.5 text-lg text-gray-900 dark:placeholder:text-gray-400', startDecoration && 'pl-14', endDecoration && 'pr-14')} id="countries">
                <option disabled selected>{mainOption}</option>
                {
                    options.map((option, index) => (
                        <option key={index} className='hover:bg-yellow-500' value={option.value}>{option.text}</option>
                    ))
                }
            </select>
        </Container>
    );
};

export default Select;
