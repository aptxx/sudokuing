import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  id?: string;
};

export default function Square({ children, id }: Props) {
  return (
    <div className="relative h-0 pb-[100%]" id={id}>
      <div className="absolute bottom-0 left-0 right-0 top-0">{children}</div>
    </div>
  );
}
