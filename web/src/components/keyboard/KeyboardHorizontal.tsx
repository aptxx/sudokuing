import { KeyboardBase } from './KeyboardBase';
import { Key } from './Key';
import Square from '../common/Square';
import { ElementStatus, Themed } from '../sudoku/types';

type Props = {
  themed: Themed;
  onClick: (value: string) => void;
  onNewGameClick?: () => void;
};

export const KeyboardHorizontal = ({ themed, onClick, onNewGameClick }: Props) => {
  const onValueClick = (value: string) => {
    onClick?.(value);
  };

  return (
    <KeyboardBase
      className="text-xl font-normal text-gray-600 dark:text-gray-200"
      onClick={onValueClick}
    >
      <Square>
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
            <Square key={key}>
              <Key
                className="h-full w-full bg-gray-50 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-800"
                key={key}
                value={key}
                onClick={onValueClick}
              >
                {themed.getElement(Number(key), ElementStatus.Normal)}
              </Key>
            </Square>
          ))}
        </div>
      </Square>
      <Key
        className="mt-2 h-8 w-full bg-gray-50 text-base hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-800 md:h-10"
        key={'Backspace'}
        value={'Backspace'}
        onClick={onValueClick}
      >
        Delete
      </Key>
      <Key
        className="mt-2 h-8 w-full bg-blue-500 text-base text-gray-100 hover:bg-blue-600 md:h-10"
        value=""
        onClick={(_) => onNewGameClick?.()}
      >
        New Game
      </Key>
    </KeyboardBase>
  );
};
