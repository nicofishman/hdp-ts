import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';

import Container from './Container';

interface SelectProps {
    mainOption: string;
    options: {value: string; text: string; selected: boolean}[];
    startDecoration?: ReactElement;
    endDecoration?: ReactElement;
    onChange?: (value: string) => void;
};

const Select: FC<SelectProps> = ({ mainOption, options, startDecoration, endDecoration, onChange }) => {
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
            <select className={clsx('bg-main h-full w-full cursor-pointer rounded-lg border-none py-2.5 text-center text-lg text-gray-900 dark:placeholder:text-gray-400', endDecoration && 'pr-14')} id="countries" onChange={(e) => {
                console.log(e.target.value);

                onChange && onChange(e.target.value || 'es');
            }}>
                <option disabled>{mainOption}</option>
                {
                    options.map((option, index) => (
                        <option key={index} selected={option.selected} value={option.value}>{option.text}</option>
                    ))
                }
            </select>
        </Container>
    );
};

export default Select;
