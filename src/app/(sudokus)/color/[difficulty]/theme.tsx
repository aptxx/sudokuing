import classnames from 'classnames';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Element, ElementStatus, Theme } from '@/components/sudoku/types';

const elements = [
  <div key={'cell-0'} className="block h-[90%] w-[90%] bg-red-500"></div>,
  <div key={'cell-1'} className="block h-[90%] w-[90%] bg-orange-500"></div>,
  <div key={'cell-2'} className="block h-[90%] w-[90%] bg-yellow-500"></div>,
  <div key={'cell-3'} className="block h-[90%] w-[90%] bg-green-500"></div>,
  <div key={'cell-4'} className="block h-[90%] w-[90%] bg-blue-500"></div>,
  <div key={'cell-5'} className="block h-[90%] w-[90%] bg-slate-500"></div>,
  <div key={'cell-6'} className="block h-[90%] w-[90%] bg-purple-500"></div>,
  <div key={'cell-7'} className="block h-[90%] w-[90%] bg-pink-500"></div>,
  <div key={'cell-8'} className="block h-[90%] w-[90%] bg-teal-500"></div>,
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
      <div className={classes}>
        {elements[key - 1]}
        {status === ElementStatus.Correct && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <CheckIcon className="w-1/2 text-gray-100" />
          </div>
        )}
        {status === ElementStatus.Incorrect && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
            <XMarkIcon className="w-1/2 text-gray-100" />
          </div>
        )}
      </div>
    );
  },
  getElements(): Element[] {
    return elements.map((_, i) => {
      return this.getElement(i + 1, ElementStatus.Normal);
    });
  },
};

export default theme;
