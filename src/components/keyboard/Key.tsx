import { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  children?: ReactNode;
  className?: string;
  value?: string;
  onClick?: (value: string) => void;
};

export const Key = ({ children, className, value = '', onClick }: Props) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(value);
    event.currentTarget.blur();
  };

  const classes = classnames('keyboard-key', className || '', {});

  return (
    <button type="button" onClick={handleClick} className={classes}>
      {children || value}
    </button>
  );
};
