import { BaseModal } from './BaseModal';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
};

export const NewGameModal = ({ open, handleClose, handleConfirm, handleCancel }: Props) => {
  return (
    <BaseModal title="Continue?" open={open} closeButtonDisable={true} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Creating a new game will clear the current puzzle.
      </p>
      <div className="mt-4 flex justify-center">
        <div
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-blue-600 sm:text-base"
          onClick={handleConfirm}
        >
          Yes
        </div>
        <div
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-center text-sm font-medium text-black shadow-sm hover:cursor-pointer hover:bg-slate-400 sm:text-base"
          onClick={handleCancel}
        >
          No
        </div>
      </div>
    </BaseModal>
  );
};
