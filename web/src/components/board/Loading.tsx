import Overlay from '../common/Overlay';

export default function Loading({ open }: { open: boolean }) {
  return (
    <Overlay open={open}>
      <div className="mx-16 w-full transform overflow-hidden rounded-lg bg-white px-4 py-4 shadow-xl transition-all dark:bg-gray-800 ">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-500 dark:text-gray-300">Loading..</p>
        </div>
      </div>
    </Overlay>
  );
}
