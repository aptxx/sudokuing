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
            <div className="mt-4 flex justify-center text-xs font-bold">
              <button
                type="button"
                className="mx-2 w-full rounded-md border border-transparent bg-blue-500 px-2 py-2 text-center text-white shadow-sm hover:bg-blue-600"
                onClick={onSecondChanceClick}
              >
                One More Chance
              </button>
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
