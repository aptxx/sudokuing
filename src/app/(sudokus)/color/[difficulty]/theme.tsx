import classnames from 'classnames';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Element, ElementStatus, Theme } from '@/components/sudoku/types';

const elements = [
  <span key={'cell-0'} className="block h-[90%] w-[90%] bg-red-500"></span>,
  <span key={'cell-1'} className="block h-[90%] w-[90%] bg-orange-500"></span>,
  <span key={'cell-2'} className="block h-[90%] w-[90%] bg-yellow-500"></span>,
  <span key={'cell-3'} className="block h-[90%] w-[90%] bg-green-500"></span>,
  <span key={'cell-4'} className="block h-[90%] w-[90%] bg-blue-500"></span>,
  <span key={'cell-5'} className="block h-[90%] w-[90%] bg-slate-500"></span>,
  <span key={'cell-6'} className="block h-[90%] w-[90%] bg-purple-500"></span>,
  <span key={'cell-7'} className="block h-[90%] w-[90%] bg-pink-500"></span>,
  <span key={'cell-8'} className="block h-[90%] w-[90%] bg-teal-500"></span>,
];

const theme = {
  type() {
    return Theme.Color;
  },
  getElementHolder() {
    return <></>;
  },
  getElement(key: number, status: ElementStatus): Element {
    const classes = classnames('relative w-full h-full flex justify-center items-center');

    return (
      <span className={classes}>
        {elements[key - 1]}
        {status === ElementStatus.Correct && (
          <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <span className="flex h-3/5 w-3/5 items-center justify-center rounded-full bg-white">
              <CheckIcon className="w-full text-gray-900" />
            </span>
          </span>
        )}
        {status === ElementStatus.Incorrect && (
          <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <span className="flex h-3/5 w-3/5 items-center justify-center rounded-full bg-white">
              <XMarkIcon className="w-full text-gray-900" />
            </span>
          </span>
        )}
      </span>
    );
  },
  getElements(): Element[] {
    return elements.map((_, i) => {
      return this.getElement(i + 1, ElementStatus.Normal);
    });
  },
};

export default theme;
