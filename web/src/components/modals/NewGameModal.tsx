import { BaseModal } from './BaseModal';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
};

export const NewGameModal = ({ isOpen, handleClose, handleConfirm, handleCancel }: Props) => {
  return (
    <BaseModal title="Continue?" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        You are creating a new game. This action will clean current solution.
      </p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-600 sm:text-base"
          onClick={handleConfirm}
        >
          Yes
        </button>
        <button
          type="button"
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-center text-sm font-medium text-black shadow-sm hover:bg-slate-400 sm:text-base"
          onClick={handleCancel}
        >
          No
        </button>
      </div>
    </BaseModal>
  );
};
