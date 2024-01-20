import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleNewGame: () => void;
};

export const GameSolvedModal = ({ isOpen, handleClose, handleNewGame }: Props) => {
  return (
    <BaseModal title="Congratulations!" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Puzzle is solved. You're an amazing player!
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
