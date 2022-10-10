import { Dialog, Transition } from '@headlessui/react';
import React, { FC, Fragment } from 'react';

interface PointsModalProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    children: React.ReactNode;
};

const PointsModal: FC<PointsModalProps> = ({ open, setOpen, children }) => {
    return (
        <Transition.Root as={Fragment} show={open}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 top-0 z-10 w-full overflow-y-auto">
                    <div className="flex h-screen w-screen items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            className='w-full max-w-3xl px-4'
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative w-full">
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default PointsModal;
