import { KeyboardBase } from './KeyboardBase';
import { Key } from './Key';

type Props = {
  onClick: (value: string) => void;
};

export const Keyboard = ({ onClick }: Props) => {
  const onValueClick = (value: string) => {
    onClick?.(value);
  };

  return (
    <KeyboardBase onClick={onValueClick}>
      <div className="flex items-center justify-center">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
          <Key key={key} value={key} onClick={onValueClick} />
        ))}
      </div>
      <button
        type="button"
        className="xxshort:w-8 m-0.5 h-14 w-full cursor-pointer select-none rounded border border-gray-300 bg-white text-lg font-bold text-black hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
        onClick={() => onClick?.('Backspace')}
      >
        X
      </button>
    </KeyboardBase>
  );
};
