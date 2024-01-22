import classnames from 'classnames';
import { CellNote } from './CellNote';

export type CellValue = {
  value: number; // user input
  answer: number;
  prefilled: boolean;
};

type Props = {
  className?: string;
  value?: CellValue;
  notes?: number[];
  onClick?: () => void;
};

export const Cell = ({ className, value, notes, onClick }: Props) => {
  const classes = classnames('w-full h-full flex justify-center items-center', className || '');

  let content;
  if (value && value.value != 0) {
    content = <div>{value?.value}</div>;
  } else if (notes && notes.length > 0) {
    content = <CellNote notes={notes} />;
  }

  return (
    <div className={classes} onClick={onClick}>
      {content}
    </div>
  );
};
