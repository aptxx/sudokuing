import Overlay from '../common/Overlay';
import { Difficulty } from '../sudoku/types';
import { capitalize } from '@/lib/utils';

function formatPlaytime(playtime: number): string {
  const minutes = Math.floor(playtime / 60);
  const seconds = playtime % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function GameSolved({
  open,
  difficulty,
  playtime,
  mistakes,
  onNewGameClick,
}: {
  open: boolean;
  difficulty?: Difficulty;
  playtime?: number;
  mistakes?: number;
  onNewGameClick: () => void;
}) {
  return (
    <Overlay open={open}>
      <div className="mx-8 w-full transform overflow-hidden rounded-lg bg-white px-8 py-4 shadow-xl transition-all dark:bg-gray-800 ">
        <div className="text-center">
          <h3 className="leading text-xl font-bold text-gray-900 dark:text-gray-100">
            Congratulations!
          </h3>
          <p className="pt-2 text-sm font-bold text-gray-500 dark:text-gray-300">
            Puzzle is solved. You&apos;re an amazing player!
          </p>
          <div className="mt-3 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {difficulty && <span>{capitalize(difficulty)}</span>}
            {playtime !== undefined && <span>{formatPlaytime(playtime)}</span>}
            {mistakes !== undefined && <span>{mistakes} mistakes</span>}
          </div>
          <div className="mt-3 flex justify-center text-xs">
            <button
              type="button"
              className="rounded text-blue-600 hover:cursor-pointer hover:underline dark:text-blue-400"
              onClick={onNewGameClick}
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
