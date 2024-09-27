import classnames from 'classnames';
import { Element, ElementStatus, Theme } from '@/components/sudoku/types';

const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = {
  type() {
    return Theme.Classic;
  },
  getElementHolder() {
    return <></>;
  },
  getElement(key: number, status: ElementStatus): Element {
    const classes = classnames('w-full h-full flex justify-center items-center', {
      'text-blue-500': status === ElementStatus.Correct,
      'text-red-500': status === ElementStatus.Incorrect,
    });

    return <div className={classes}>{elements[key - 1]}</div>;
  },
  getElements(): Element[] {
    return elements.map((_, i) => {
      return this.getElement(i + 1, ElementStatus.Normal);
    });
  },
};

export default theme;
