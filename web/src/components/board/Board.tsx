import classnames from 'classnames';
import { Cell, CellValue } from '@/components/board/Cell';
import Square from '../common/Square';

function isRelated(chosenCell: number, target: number): boolean {
  if (chosenCell < 0 || chosenCell === undefined || chosenCell === target) {
    return false;
  }

  const chosenGroup = Math.floor(chosenCell / 9);
  const chosenGroupPos = chosenCell % 9;
  const targetGroup = Math.floor(target / 9);
  const targetGroupPos = target % 9;

  // same group
  if (chosenGroup === targetGroup) {
    return true;
  }

  // same row
  if (
    Math.floor(chosenGroup / 3) === Math.floor(targetGroup / 3) &&
    Math.floor(chosenGroupPos / 3) == Math.floor(targetGroupPos / 3)
  ) {
    return true;
  }

  // same col
  if (chosenGroup % 3 === targetGroup % 3 && chosenGroupPos % 3 == targetGroupPos % 3) {
    return true;
  }

  return false;
}

type Props = {
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  chosen?: number;
  onCellClick?: (position: number) => void;
};

export const Board = ({ cells, notes, chosen, onCellClick }: Props) => {
  const groups = [];
  for (let i = 0; i < 9; i++) {
    const cls = classnames('grid grid-cols-3 grid-rows-3 gap-0 border-solid border-gray-600', {
      'border-t': i > 2,
      'border-b': i < 6,
      'border-l': i % 3 != 0, // 0 ,3, 6
      'border-r': i % 3 != 2, // 2 ,5, 8
    });
    const base = i * 9;
    const chosenCell = chosen || -1;
    groups.push(
      <div key={`board-group-${i}`} className={cls}>
        {Array(9)
          .fill(0)
          .map((_, j) => {
            const pos = base + j;
            return (
              <Cell
                key={pos}
                value={cells[pos]}
                notes={notes[pos]}
                chosen={chosenCell === pos}
                chosenRelated={isRelated(chosenCell, pos)}
                onClick={() => onCellClick?.(pos)}
              />
            );
          })}
      </div>
    );
  }
  return (
    <Square>
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-0 rounded border-2 border-solid border-gray-600 text-lg font-medium text-gray-800 sm:text-xl md:text-2xl">
        {groups}
      </div>
    </Square>
  );
};
