import classnames from 'classnames';
import { CellNote } from './CellNote';

export type CellValue = {
  value: number; // user input
  answer: number;
  prefilled: boolean;
};

type Props = {
  value?: CellValue;
  notes?: number[];
  chosen?: boolean;
  highlight?: boolean;
  onClick?: () => void;
};

export const Cell = ({ value, notes, chosen, highlight, onClick }: Props) => {
  const classes = classnames('w-full h-full flex justify-center items-center', {
    'bg-blue-200': chosen,
    'bg-blue-500': !chosen && highlight,
    'text-red-500': value && value.value && value.value != value.answer,
  });

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
