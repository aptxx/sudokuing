import { Difficulty, CellValue } from "@/components/sudoku/types";
import sudoku from "./sudoku";


export function generatePuzzle(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Easy:
      return sudoku.generate(56);
    case Difficulty.Medium:
      return sudoku.generate(45);
    case Difficulty.Hard:
      return sudoku.generate('very-hard');
    case Difficulty.Expert:
      return sudoku.generate('insane');
    case Difficulty.Crazy:
      return sudoku.generate('inhuman');
    default:
      return sudoku.generate(56);
  }
}


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