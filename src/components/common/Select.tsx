import React, { FC } from 'react';

import Container from './Container';

interface SelectProps {
    mainOption: string;
    options: {value: string; text: string}[];
};

const Select: FC<SelectProps> = ({ mainOption, options }) => {
    return (
        <Container className='flex h-20 items-center justify-center'>
            <select className="bg-main h-full w-full rounded-lg p-2.5 text-lg text-gray-900 dark:placeholder:text-gray-400 " id="countries">
                <option disabled selected>{mainOption}</option>
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.text}</option>
                    ))
                }
            </select>
        </Container>
    );
};

export default Select;
