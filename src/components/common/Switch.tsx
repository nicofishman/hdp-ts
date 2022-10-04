import React, { FC } from 'react';

interface SwitchProps {
    checked: boolean;
    setChecked: () => void;
};

const Switch: FC<SwitchProps> = ({ checked, setChecked }) => {
    return (
        <label className="relative inline-flex cursor-pointer items-center" htmlFor="checked-toggle">
            <input className="peer sr-only" defaultChecked={checked} id="checked-toggle" type="checkbox" onClick={setChecked} />
            <div className="peer h-6 w-11 rounded-full bg-pink after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-light-pink  peer-checked:after:translate-x-full dark:bg-light-pink" />
        </label>
    );
};

export default Switch;
