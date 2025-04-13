import clsx from 'clsx';
import React, {
    FC,
    InputHTMLAttributes,
    ReactNode,
    RefObject,
    useId
} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    myRef?: RefObject<HTMLInputElement>;
    label?: string;
    divClassName?: string;
}

const Input: FC<InputProps> = ({
    placeholder,
    myRef,
    startDecorator,
    endDecorator,
    label,
    className,
    divClassName,
    ...props
}) => {
    const id = useId();

    return (
        <div className={divClassName}>
            <label className={clsx('font-main text-base')} htmlFor={id}>
                {label}
            </label>
            <div className={clsx('relative', className)}>
                <input
                    ref={myRef}
                    className={clsx(
                        'main-card h-full w-full px-4 outline-none',
                        startDecorator && 'pl-12',
                        endDecorator && 'pr-12'
                    )}
                    id={id}
                    placeholder={placeholder}
                    {...props}
                />
                {startDecorator && (
                    <div
                        className={
                            'relative left-2 top-[10%] h-10 w-10 translate-y-[50%]'
                        }
                    >
                        {startDecorator}
                    </div>
                )}
                {endDecorator && (
                    <div className={'absolute right-2 top-[20%] h-10 w-10'}>
                        {endDecorator}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
