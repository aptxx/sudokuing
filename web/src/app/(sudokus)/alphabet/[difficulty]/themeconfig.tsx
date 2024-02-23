import classnames from 'classnames';
import { Element, ElementStatus, Theme } from '@/components/sudoku/types';

const elements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const themeconfig = {
  type() {
    return Theme.Alphabet;
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

export default themeconfig;
