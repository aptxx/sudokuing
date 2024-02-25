import { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  children?: ReactNode;
  className?: string;
  value?: string;
  onClick?: (value: string) => void;
};

export const Key = ({ children, className, value = '', onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    onClick?.(value);
    event.currentTarget.blur();
  };

  const classes = classnames(
    'flex items-center justify-center cursor-pointer select-none rounded border border-gray-200 dark:border-gray-600',
    className || '',
    {}
  );

  return (
    <div aria-label={`key-${value}`} onClick={handleClick} className={classes}>
      {children || value}
    </div>
  );
};
