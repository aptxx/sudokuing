import Overlay from '../common/Overlay';

function formatPlaytime(playtime: number): string {
  const minutes = Math.floor(playtime / 60);
  const seconds = playtime % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function GameSolved({
  open,
  onNewGameClick,
}: {
  open: boolean;
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
            Puzzle is solved. You're an amazing player!
          </p>
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
