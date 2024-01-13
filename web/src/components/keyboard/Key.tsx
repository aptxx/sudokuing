import { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  children?: ReactNode;
  value: string;
  onClick: (value: string) => void;
};

export const Key = ({ children, value, onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value);
    event.currentTarget.blur();
  };

  const classes = classnames(
    'rounded border border-gray-300 bg-white m-0.5 text-2xl xxshort:h-8 xxshort:w-8 h-14 w-10 font-bold cursor-pointer select-none text-black hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700',
    {}
  );

  return (
    <button aria-label={`key-${value}`} onClick={handleClick} className={classes}>
      {children || value}
    </button>
  );
};
