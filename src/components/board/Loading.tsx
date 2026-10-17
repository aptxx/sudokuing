import Overlay from '../common/Overlay';

export default function Loading({ open }: { open: boolean }) {
  return (
    <Overlay open={open}>
      <div className="mx-16 w-full transform overflow-hidden rounded-lg bg-white px-4 py-4 shadow-xl transition-all dark:bg-gray-800 ">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg text-gray-900 dark:text-gray-100">Loading puzzle...</p>
        </div>
      </div>
    </Overlay>
  );
}
