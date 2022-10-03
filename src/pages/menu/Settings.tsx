import React, { FC, useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import Button from '../../components/common/Button';
import Container from '../../components/common/Container';
import Switch from '../../components/common/Switch';
import Select from '../../components/common/Select';

interface SettingsProps {

};

const Settings: FC<SettingsProps> = () => {
    const [checked, setChecked] = useState<boolean>(window.localStorage.getItem('theme') === 'dark');

    const handleSwitchChange = () => {
        const layoutTheme = document.querySelector('.layout');

        if (layoutTheme?.classList.contains('dark')) {
            layoutTheme?.classList.remove('dark');
            window.localStorage.setItem('theme', 'light');
            window.dispatchEvent(new Event('storage'));
        } else {
            layoutTheme?.classList.add('dark');
            window.localStorage.setItem('theme', 'dark');
            window.dispatchEvent(new Event('storage'));
        }
        setChecked(!checked);
    };

    return (
        <div className='mx-0 flex flex-col items-center gap-6 lg:mx-[15%]'>
            <Link className='w-full' to='/'>
                <Button className='flex h-12 w-full items-center justify-center' text='Volver'>
                    <div className='absolute top-1 left-2'>
                        <IoChevronBack/>
                    </div>
                </Button>
            </Link>
            <Container className='flex h-20 flex-row items-center justify-center gap-6'>
                <BsFillSunFill />
                <Switch checked={checked} setChecked={handleSwitchChange} />
                <BsFillMoonFill />
            </Container>
            <Select mainOption='Idioma' options={[{ value: 'ES', text: 'Español' }, { value: 'EN', text: 'English' }]}/>
        </div>
    );
};

export default Settings;
