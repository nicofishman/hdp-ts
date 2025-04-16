import clsx from 'clsx';
import React, { FC, ReactElement } from 'react';

import Container from './Container';

interface SelectProps {
    mainOption: string;
    options: { value: string; text: string; selected: boolean }[];
    startDecoration?: ReactElement;
    endDecoration?: ReactElement;
    onChange?: (value: string) => void;
    className?: string;
}

const Select: FC<SelectProps> = ({
    mainOption,
    options,
    startDecoration,
    endDecoration,
    onChange,
    className
}) => {
    return (
        <Container
            className={clsx(
                'relative flex h-full items-center justify-center',
                className
            )}
        >
            {startDecoration && (
                <div className="absolute left-2">{startDecoration}</div>
            )}
            {endDecoration && (
                <div className="absolute right-2">{endDecoration}</div>
            )}
            <select
                className={clsx(
                    'bg-main h-full w-full cursor-pointer rounded-lg border-none py-2.5 text-center text-lg text-gray-900 dark:placeholder:text-gray-400',
                    endDecoration && 'pr-14'
                )}
                defaultValue={mainOption}
                id="countries"
                onChange={(e) => {
                    onChange && onChange(e.target.value || 'es');
                }}
            >
                <option disabled value={mainOption}>
                    {mainOption}
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
        </Container>
    );
};

export default Select;
