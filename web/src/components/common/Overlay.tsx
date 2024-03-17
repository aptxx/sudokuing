import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Props = {
  children?: React.ReactNode;
  open: boolean;
};

export default function Overlay({ children, open }: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-50"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="z-10 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50 transition-opacity">
          {children}
        </div>
      </Transition.Child>
    </Transition.Root>
  );
}
