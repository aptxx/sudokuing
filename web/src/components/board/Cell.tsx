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
  chosenRelated?: boolean;
  onClick?: () => void;
};

export const Cell = ({ value, notes, chosen, chosenRelated, onClick }: Props) => {
  const isPrefilled = !!value?.prefilled;
  const isInvalid = value && value.value != undefined && value.value != value.answer;

  const classes = classnames('w-full h-full flex justify-center items-center', {
    'bg-blue-200': chosen,
    'bg-blue-50': !chosen && chosenRelated,
    'text-blue-500': !isInvalid && !isPrefilled,
    'text-red-500': isInvalid,
    'border-1 border border-gray-300': !chosen,
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
