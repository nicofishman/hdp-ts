import clsx from 'clsx';
import { ClassNameValue, twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassNameValue[]) => {
    return clsx(twMerge(...inputs));
};
