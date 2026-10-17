import { Element } from '../sudoku/types';

type Props = {
  elements: Element[];
};

export default function ElementsLine({ elements }: Props) {
  const lis = (elements || []).map((v, i) => {
    return (
      <ins key={i} className="mx-0.5 block h-4 w-4">
        {v}
      </ins>
    );
  });
  return <span className="inline-flex">{lis}</span>;
}
