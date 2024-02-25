import { BaseModal } from './BaseModal';

function formatPlaytime(playtime: number): string {
  const minutes = Math.floor(playtime / 60);
  const seconds = playtime % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

type Props = {
  isOpen: boolean;
  playtime: number;
  handleClose: () => void;
  handleNewGame: () => void;
};

export const GameSolvedModal = ({ isOpen, playtime = 0, handleClose, handleNewGame }: Props) => {
  return (
    <BaseModal title="Congratulations!" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {`Puzzle is solved in ${formatPlaytime(playtime)}. You're an amazing player!`}
      </p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-600 sm:text-base"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>
    </BaseModal>
  );
};
