import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (value: string) => void;
};

export const KeyboardBase = ({ children, className, onClick }: Props) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onClick?.('Enter');
      } else if (e.code === 'Backspace') {
        onClick?.('Backspace');
      } else {
        onClick?.(e.key);
      }
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [onClick]);

  return <div className={className || ''}>{children}</div>;
};
