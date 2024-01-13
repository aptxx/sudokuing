import { KeyboardBase } from './KeyboardBase';
import { KeyHorizontal } from './KeyHorizontal';

type Props = {
  onClick: (value: string) => void;
};

export const KeyboardHorizontal = ({ onClick }: Props) => {
  const onValueClick = (value: string) => {
    onClick?.(value);
  };

  return (
    <KeyboardBase onClick={onValueClick}>
      <div className="flex justify-center">
        {['1', '2', '3'].map((key) => (
          <KeyHorizontal key={key} value={key} onClick={onValueClick} />
        ))}
      </div>
      <div className="flex justify-center">
        {['4', '5', '6'].map((key) => (
          <KeyHorizontal key={key} value={key} onClick={onValueClick} />
        ))}
      </div>
      <div className="flex justify-center">
        {['7', '8', '9'].map((key) => (
          <KeyHorizontal key={key} value={key} onClick={onValueClick} />
        ))}
      </div>
    </KeyboardBase>
  );
};
