import { CellValue } from "@/components/board/Cell";


export function puzzleToCells(puzzle: string, solved: string): {[key:number]: CellValue} {
  const cells = {} as {[key: number]: CellValue};

  for (let i = 0; i < 81; i++) {
    const value = puzzle[i];
    const answer = solved[i];
    const cell: CellValue = {
      value: value === '.' ? 0 : parseInt(value),
      answer: parseInt(answer),
      prefilled: value !== '.'
    };
    cells[i] = cell;
  }

  return cells;
}

export function capitalize(str: string): string {
  if (!str || str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}