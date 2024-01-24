import classnames from 'classnames';
import { PlayIcon } from '@heroicons/react/20/solid';
import { Cell, CellValue } from '@/components/board/Cell';
import Square from '../common/Square';

function isRelated(chosenCell: number, target: number): boolean {
  if (chosenCell < 0 || chosenCell === undefined || chosenCell === target) {
    return false;
  }

  const chosenRow = Math.floor(chosenCell / 9);
  const chosenCol = chosenCell % 9;
  const targetRow = Math.floor(target / 9);
  const targetCol = target % 9;

  // same group
  if (
    Math.floor(chosenRow / 3) === Math.floor(targetRow / 3) &&
    Math.floor(chosenCol / 3) === Math.floor(targetCol / 3)
  ) {
    return true;
  }

  // same row
  if (chosenRow === targetRow) {
    return true;
  }

  // same col
  if (chosenCol === targetCol) {
    return true;
  }

  return false;
}

type Props = {
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  chosen?: number;
  onCellClick?: (position: number) => void;
  paused?: boolean;
  onResumeClick?: () => void;
};

export const Board = ({ cells, notes, chosen, onCellClick, paused, onResumeClick }: Props) => {
  const chosenCell = chosen || -1;
  const elems = Array(81)
    .fill(0)
    .map((_, i) => {
      const value = cells[i];
      const isChosen = chosen === i;
      const isChosenRelated = isRelated(chosenCell, i);
      const isPrefilled = !!value?.prefilled;
      const isInvalid = value && value.value != undefined && value.value != value.answer;

      const row = Math.floor(i / 9);
      const col = i % 9;
      const classes = classnames('border border-gray-300 border-solid', {
        'border-t-gray-600': row % 3 === 0,
        'border-b-gray-600': (row + 1) % 3 === 0,
        'border-l-gray-600': col % 3 === 0,
        'border-r-gray-600': (col + 1) % 3 === 0,
        'bg-blue-200': isChosen,
        'bg-blue-50': !isChosen && isChosenRelated,
        'text-blue-500': !isInvalid && !isPrefilled,
        'text-red-500': isInvalid,
      });
      if (paused) {
        return <Cell className={classes} key={i} />;
      }
      return (
        <Cell
          className={classes}
          key={i}
          value={cells[i]}
          notes={notes[i]}
          onClick={() => onCellClick?.(i)}
        />
      );
    });
  return (
    <Square>
      <div className="relativ grid h-full w-full text-lg font-medium text-gray-800 sm:text-xl md:text-2xl">
        <div className="grid-rows-9 grid grid-cols-9 gap-0 rounded border-2 border-solid border-gray-600">
          {elems}
        </div>
        {paused && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-blue-500 opacity-100">
            <button onClick={() => onResumeClick?.()}>
              <PlayIcon className="h-16 w-16" />
            </button>
          </div>
        )}
      </div>
    </Square>
  );
};
