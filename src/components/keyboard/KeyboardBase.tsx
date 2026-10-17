type Props = {
  children: React.ReactNode;
  className?: string;
};

export const KeyboardBase = ({ children, className }: Props) => {
  return <div className={className || ''}>{children}</div>;
};
