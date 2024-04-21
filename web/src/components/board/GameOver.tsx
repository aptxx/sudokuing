import { FilmIcon } from '@heroicons/react/20/solid';
import Overlay from '../common/Overlay';

export default function GameOver({
  open,
  showNewGameButton,
  onNewGameClick,
  onSecondChanceClick,
}: {
  open: boolean;
  showNewGameButton: boolean;
  onNewGameClick: () => void;
  onSecondChanceClick: () => void;
}) {
  return (
    <Overlay open={open}>
      <div className="mx-8 w-full transform overflow-hidden rounded-lg bg-white px-8 py-4 shadow-xl transition-all dark:bg-gray-800">
        <div className="text-center">
          <h3 className="leading text-xl font-bold text-gray-900 dark:text-gray-100">Game Over</h3>
          <p className="pt-2 text-sm font-bold text-gray-500 dark:text-gray-300">
            You were so close to winning this time!
          </p>
          {showNewGameButton && (
            <div
              className="mx-2 mt-4 flex w-full items-center justify-center rounded border border-transparent bg-blue-500 px-2 py-2 text-xs font-bold text-white shadow-sm hover:cursor-pointer hover:bg-blue-600"
              onClick={onSecondChanceClick}
            >
              <span>One More Chance</span>
              <span className="ml-2">
                <FilmIcon className="h-6 w-6" />
              </span>
            </div>
          )}
          <div className="mt-2 flex justify-center text-xs">
            <span
              className="text-blue-600 hover:cursor-pointer dark:text-blue-400"
              onClick={onNewGameClick}
            >
              New Game
            </span>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
