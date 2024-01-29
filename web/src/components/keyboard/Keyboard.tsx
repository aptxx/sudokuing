import { KeyboardBase } from './KeyboardBase';
import { Key } from './Key';
import Square from '../common/Square';
import { ElementStatus, Themed } from '../sudoku/types';

type Props = {
  themed: Themed;
  onClick: (value: string) => void;
  onNewGameClick?: () => void;
};

export const Keyboard = ({ themed, onClick, onNewGameClick }: Props) => {
  const onValueClick = (value: string) => {
    onClick?.(value);
  };

  return (
    <KeyboardBase
      className="w-full text-xl font-normal text-gray-600 dark:text-white"
      onClick={onValueClick}
    >
      <div className="flex w-full flex-col justify-center">
        <div className="flex items-center justify-around">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((key) => (
            <div key={key} className="mx-0.5 flex-auto">
              <Square>
                <Key
                  className="h-full w-full bg-gray-50 text-2xl hover:bg-gray-100"
                  value={key}
                  onClick={onValueClick}
                >
                  {themed.getElement(Number(key), ElementStatus.Normal)}
                </Key>
              </Square>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-around text-base">
          <Key
            className="h-10 w-full bg-gray-50 text-gray-600 hover:bg-gray-100"
            value={'Backspace'}
            onClick={onValueClick}
          >
            Delete
          </Key>
          <Key
            className="ml-4 h-10 w-full bg-blue-500 text-gray-200 hover:bg-blue-600"
            value=""
            onClick={(_) => onNewGameClick?.()}
          >
            New Game
          </Key>
        </div>
      </div>
    </KeyboardBase>
  );
};
