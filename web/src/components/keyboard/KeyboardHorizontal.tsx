import { KeyboardBase } from './KeyboardBase';
import { Key } from './Key';
import Square from '../common/Square';

type Props = {
  onClick: (value: string) => void;
  onNewGameClick?: () => void;
};

export const KeyboardHorizontal = ({ onClick, onNewGameClick }: Props) => {
  const onValueClick = (value: string) => {
    onClick?.(value);
  };

  return (
    <KeyboardBase
      className="text-lg font-medium text-gray-800 dark:text-white"
      onClick={onValueClick}
    >
      <Square>
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
            <Square key={key}>
              <Key
                className="h-full w-full bg-gray-50 hover:bg-gray-100"
                key={key}
                value={key}
                onClick={onValueClick}
              />
            </Square>
          ))}
        </div>
      </Square>
      <Key
        className="mt-2 h-8 w-full bg-gray-50 text-base hover:bg-gray-100 md:h-10"
        key={'Backspace'}
        value={'Backspace'}
        onClick={onValueClick}
      >
        Delete
      </Key>
      <Key
        className="mt-2 h-8 w-full bg-blue-500 text-base text-white hover:bg-blue-600 md:h-10"
        value=""
        onClick={(_) => onNewGameClick?.()}
      >
        New Game
      </Key>
    </KeyboardBase>
  );
};
