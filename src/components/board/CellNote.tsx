import { ElementStatus, Themed } from '../sudoku/types';

type Props = {
  notes?: number[];
  themed: Themed;
};

export const CellNote = ({ notes, themed }: Props) => {
  if (!notes || notes.length == 0) {
    return <></>;
  }

  return (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 text-[8px] leading-none text-gray-500 dark:text-gray-400 sm:text-[10px]">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <div key={n} className="flex items-center justify-center">
          {notes.includes(n) ? themed.getElement(n, ElementStatus.Normal) : ''}
        </div>
      ))}
    </div>
  );
};
