import React from 'react';
import type { Metadata } from 'next';
import { BASE_URL } from '@/config/setting';
import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/constants/constants';

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: BASE_URL,
    },
  };
}

export default function Home() {
  return (
    <>
      <div className="x-container mb-12">
        <Sudoku initDifficulty={Difficulty.Easy} initTheme={Theme.Classic} storagePrefix="" />
      </div>

      <div className="x-container post-block mb-12">
        <h2>Sudoku Reborn!</h2>
        <p>Play free themed Sudoku and enjoy your day!</p>
      </div>
      <div className="x-container post-block mb-12">
        <h2>How to play Sudoku</h2>
        <div>
          <p className="mb-2">
            The game board consists of a 9x9 grid, divided into 9 smaller 3x3 squares. The game goal
            is to fill each square with numbers from 1 to 9, ensuring that every row, column, and
            small square contains each number exactly once.
          </p>
          <ul>
            <li>Fill in the remaining empty squares.</li>
            <li>Fill each 3x3 square with the numbers 1 to 9.</li>
            <li>
              Each row, column, and 3x3 box must contain the numbers 1 to 9, with no repetitions.
            </li>
          </ul>
        </div>
      </div>
      <div className="x-container post-block mb-12">
        <h2>Tips</h2>
        <div>
          <p className="mb-2">
            Sudoku is a game of logic and patience. With practice, you'll improve your pattern
            recognition and deduction skills, allowing you to solve even the most challenging
            puzzles. Happy Sudoku solving!
          </p>
          <ul>
            <li>
              Look for squares that have only one possible number based on the existing numbers in
              their row, column, and 3x3 box. These "unique candidates" can be filled in
              immediately, providing valuable clues for the rest of the puzzle.
            </li>
            <li>
              Use logical deduction to eliminate possibilities. Look for numbers that are already
              present in a row, column, or 3x3 box, and eliminate them as options for other empty
              squares within that unit. Repeat this process until you've narrowed down the
              possibilities.
            </li>
            <li>
              When you reach a point where no obvious moves can be made, try making an educated
              guess by selecting a square with two or three potential numbers. Follow the
              consequences of each choice, keeping track of any contradictions that arise. If you
              encounter a contradiction, backtrack and try the alternative number(s) for that
              square.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
