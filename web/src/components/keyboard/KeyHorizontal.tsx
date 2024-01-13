import { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  children?: ReactNode;
  value: string;
  onClick: (value: string) => void;
};

export const KeyHorizontal = ({ children, value, onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  const classes = classnames(
    'rounded border border-gray-300 bg-white m-1 text-2xl h-16 w-16 font-bold cursor-pointer select-none text-black hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700',
    {}
  );

  return (
    <button aria-label={`key-${value}`} onClick={handleClick} className={classes}>
      {children || value}
    </button>
  );
};
