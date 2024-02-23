import { SITE_TITLE } from '@/config/setting';

export default function Abouts() {
  return (
    <>
      <div className="x-container post-block mb-12">
        <h2>About Sudoku</h2>
        <p>
          <a
            className="text-blue-600 hover:underline"
            href="https://en.wikipedia.org/wiki/Sudoku"
            rel="nofollow"
            title="Sudoku"
            target="_blank"
          >
            Sudoku
          </a>{' '}
          is a logic-based, combinatorial number-placement puzzle. In classic Sudoku, the goal is to
          fill a 9 x 9 grid with digits so that each column, each row, and each of the nine 3 x 3
          subgrids that compose the grid contains all of the digits from 1 to 9. The puzzle setter
          provides a partially completed grid, which for a well-posed puzzle has a single solution.
        </p>
      </div>
      <div className="x-container post-block mb-12">
        <h2>About {SITE_TITLE}</h2>
        <p>
          <b>Sudokuing(Sudoku'ing)</b> is an online Sudoku gaming website that focuses on providing
          a user-friendly, variety of themed Sudoku puzzles for everyone to enjoy.
        </p>
      </div>
    </>
  );
}
