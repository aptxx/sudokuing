import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { generateBaseMetadata, generateIinkedData } from '@/lib/seo';
import { capitalize } from '@/lib/utils';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { difficulty: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return generateBaseMetadata(Theme.Classic, params.difficulty as Difficulty);
}

export default function Page({ params, searchParams }: Props) {
  const theme = Theme.Classic;
  const difficulty = params.difficulty as Difficulty;
  const jsonLd = generateIinkedData(theme, difficulty);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="x-container mb-12">
        <Sudoku initTheme={theme} initDifficulty={difficulty} storagePrefix={''} />
      </div>

      <div className="x-container post-block mb-12">
        <h1>{`${capitalize(theme)} Sudoku ${capitalize(difficulty)}`}</h1>
        <p>
          You are playing {`${theme} sudoku ${difficulty}`}. {capitalize(theme)} Sudoku is one of
          the most popular theme and appeared in the 20th century. The basic elements are 1 to 9,
          your goal is to fill the 9x9 grid with the basic elements.
        </p>
      </div>
      <div className="x-container post-block mb-12">
        <h2>{`How to play ${theme} Sudoku`}</h2>
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
