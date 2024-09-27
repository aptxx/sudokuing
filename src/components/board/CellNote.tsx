type Props = {
  notes?: number[];
};

export const CellNote = ({ notes }: Props) => {
  if (!notes || notes.length == 0) {
    return <></>;
  }

  return <div></div>;
};
