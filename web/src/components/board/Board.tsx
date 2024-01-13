import classnames from 'classnames';
import { Cell, CellValue } from '@/components/board/Cell';

const CellContainer = (props: any) => {
  return (
    <div className="border-1 border border-gray-300">
      <Cell {...props} />
    </div>
  );
};

type Props = {
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  chosen?: number;
  onCellClick?: (position: number) => void;
};

export const Board = ({ cells, notes, chosen, onCellClick }: Props) => {
  const groups = [];
  for (let i = 0; i < 9; i++) {
    const base = i * 9;
    const cls = classnames('grid grid-cols-3 grid-rows-3 gap-0 border-solid border-gray-800', {
      'border-t': i > 2,
      'border-b': i < 6,
      'border-l': i % 3 != 0, // 0 ,3, 6
      'border-r': i % 3 != 2, // 2 ,5, 8
    });
    groups.push(
      <div key={`board-group-${i}`} className={cls}>
        {Array(9)
          .fill(0)
          .map((_, j) => {
            const pos = base + j;
            return (
              <CellContainer
                key={pos}
                value={cells[pos]}
                notes={notes[pos]}
                chosen={chosen === pos}
                onClick={() => onCellClick?.(pos)}
              />
            );
          })}
      </div>
    );
  }
  return (
    <div className="relative w-full border-2 border-solid border-gray-800 pt-[100%] text-base font-bold text-black md:text-xl">
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-0">{groups}</div>
      </div>
    </div>
  );
};
