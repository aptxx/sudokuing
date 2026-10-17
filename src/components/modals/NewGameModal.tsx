import { BaseModal } from './BaseModal';

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  handleClose: () => void;
  handleConfirm: () => void;
};

export const NewGameModal = ({
  open,
  title = 'Continue?',
  message = 'Creating a new game will clear the current puzzle.',
  handleClose,
  handleConfirm,
}: Props) => {
  return (
    <BaseModal title={title} open={open} closeButtonDisable={true} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">{message}</p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:bg-blue-600 sm:text-base"
          onClick={handleConfirm}
        >
          Yes
        </button>
        <button
          type="button"
          className="mx-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-center text-sm font-medium text-black shadow-sm hover:cursor-pointer hover:bg-slate-400 sm:text-base"
          onClick={handleClose}
        >
          No
        </button>
      </div>
    </BaseModal>
  );
};
