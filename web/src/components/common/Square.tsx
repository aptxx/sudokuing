import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Square({ children }: Props) {
  return (
    <div className="relative h-0 pb-[100%]">
      <div className="absolute bottom-0 left-0 right-0 top-0">{children}</div>
    </div>
  );
}
