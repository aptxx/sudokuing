import { DFP_BANNER_ADUNIT, SITE_TITLE } from '@/config/setting';
import BannerAd from './dfp/BannerAd';

export default function Abouts() {
  return (
    <>
      <div className="x-container post-block mb-12">
        <h2>About Sudoku</h2>
        <p>
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
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
      <div className="x-container mb-12">
        <BannerAd
          className="flex max-h-[90px] w-full items-center justify-center overflow-hidden"
          id="div-gpt-ad-1"
          adunit={DFP_BANNER_ADUNIT}
          sizes={[[468, 60], [728, 90], 'fluid']}
          sizeMapping={[
            { viewport: [1000, 600], sizes: [[468, 60], [728, 90], 'fluid'] },
            { viewport: [700, 400], sizes: [[468, 60], 'fluid'] },
            { viewport: [0, 0], sizes: ['fluid'] },
          ]}
        />
      </div>
    </>
  );
}
