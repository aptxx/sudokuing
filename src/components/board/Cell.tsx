import classnames from 'classnames';
import { CellNote } from './CellNote';
import Square from '../common/Square';
import { CellValue, ElementStatus, GameStatus, Themed } from '../sudoku/types';

type Props = {
  className?: string;
  themed: Themed;
  status?: GameStatus;
  value?: CellValue;
  notes?: number[];
  ariaLabel?: string;
  position: number;
  onCellClick?: (position: number) => void;
};

export const Cell = ({
  className,
  themed,
  status,
  value,
  notes,
  ariaLabel,
  position,
  onCellClick,
}: Props) => {
  const classes = classnames('board-cell', className || '');
  if (status === GameStatus.Paused) {
    return (
      <Square>
        <div className={classes}>{themed.getElementHolder()}</div>
      </Square>
    );
  }

  let content;
  if (value && value.value != 0) {
    let elementStatus = ElementStatus.Normal;
    if (!value.prefilled) {
      elementStatus =
        value.value === value.answer ? ElementStatus.Correct : ElementStatus.Incorrect;
    }
    content = themed.getElement(value.value, elementStatus);
  } else if (notes && notes.length > 0) {
    content = <CellNote notes={notes} themed={themed} />;
  }

  return (
    <Square>
      <div
        role="button"
        aria-label={ariaLabel}
        className={classes}
        onClick={() => onCellClick?.(position)}
      >
        {content}
      </div>
    </Square>
  );
};
