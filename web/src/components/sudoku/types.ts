import { ReactNode } from "react";

export enum ElementStatus {
  Normal = 0,
  Correct = 1,
  Incorrect = 2
}

export type Element = ReactNode | string | number;

export enum Theme {
  Classic = 'classic',
  Alphabet = 'alphabet',
  Color = 'color',
}

export interface Themed {
  type(): Theme
  getElementHolder(): Element;
  getElement(key: number, status: ElementStatus): Element;
}

export enum Difficulty {
  Easy = 'easy',
  Medium ='medium',
  Hard = 'hard',
  Expert ='expert',
  Crazy = 'crazy'
}

export enum GameStatus {
  Playing,
  Paused,
  GameOver,
  GameSolved,
}

export type GameState = {
  puzzle: string;
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  difficulty: Difficulty;
  deprecated: number;
  mistakes: number;
  hints: number;
  chances: number;
};

export type CellValue = {
  value: number; // user input
  answer: number;
  prefilled: boolean;
};