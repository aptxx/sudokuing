import { memo } from 'react';
import classnames from 'classnames';
import { PlayIcon } from '@heroicons/react/20/solid';
import { Cell } from '@/components/board/Cell';
import Square from '../common/Square';
import { CellValue, GameStatus, Themed } from '../sudoku/types';

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

const CellMemoized = memo(Cell);

type Props = {
  themed: Themed;
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  chosen?: number;
  status?: GameStatus;
  onCellClick?: (position: number) => void;
  onResumeClick?: () => void;
};

export const Board = ({
  themed,
  cells,
  notes,
  chosen,
  status,
  onCellClick,
  onResumeClick,
}: Props) => {
  const chosenCell = chosen || -1;
  const elems = Array(81)
    .fill(0)
    .map((_, i) => {
      const isChosen = chosen === i;
      const isChosenRelated = isRelated(chosenCell, i);

      const row = Math.floor(i / 9);
      const col = i % 9;
      const classes = classnames('border border-gray-300 border-solid dark:border-gray-600', {
        'border-t-gray-600 dark:border-t-gray-300': row % 3 === 0,
        'border-b-gray-600 dark:border-b-gray-300': (row + 1) % 3 === 0,
        'border-l-gray-600 dark:border-l-gray-300': col % 3 === 0,
        'border-r-gray-600 dark:border-r-gray-300': (col + 1) % 3 === 0,
        'bg-blue-200 dark:bg-gray-700': isChosen,
        'bg-blue-50 dark:bg-gray-900': !isChosen && isChosenRelated,
      });
      return (
        <CellMemoized
          key={i}
          className={classes}
          status={status}
          themed={themed}
          value={cells[i]}
          notes={notes[i]}
          onClick={() => onCellClick?.(i)}
        />
      );
    });
  return (
    <Square id="sudoku-board">
      <div className="relative grid h-full w-full text-2xl font-normal text-gray-700 dark:text-gray-200">
        <div className="grid-rows-9 grid grid-cols-9 gap-0 rounded border border-solid border-gray-600 dark:border-gray-300">
          {elems}
        </div>
        {status == GameStatus.Paused && (
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
