import React from 'react';
import type { Metadata } from 'next';
import { BASE_URL, SITE_TITLE } from '@/config/setting';
import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/components/sudoku/types';
import Abouts from '@/components/common/Abouts';
import { capitalize } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: BASE_URL,
    },
  };
}

const themeUrl = (theme: Theme, difficulty: Difficulty) =>
  theme === Theme.Classic ? `${BASE_URL}/${difficulty}` : `${BASE_URL}/${theme}/${difficulty}`;

const ThemeCards = () => (
  <div className="x-container post-block mb-12 grid gap-4 sm:grid-cols-3">
    {Object.values(Theme).map((theme) => (
      <div key={theme} className="rounded border p-4 dark:border-gray-700">
        <h3 className="mb-2 font-bold">{`${capitalize(theme)} Sudoku`}</h3>
        <p className="mb-3 text-sm">
          {theme === Theme.Classic &&
            'The traditional 9×9 grid with digits 1–9. Five levels from a relaxed easy board to our sparsest crazy setting.'}
          {theme === Theme.Alphabet &&
            'The same logic with letters A–I instead of numbers — a fresh mental workout for word-game brains.'}
          {theme === Theme.Color &&
            'Deduction by color instead of symbol. Visual, approachable, and surprisingly deep at higher levels.'}
        </p>
        <div className="flex flex-wrap gap-x-3 text-sm">
          {Object.values(Difficulty).map((difficulty) => (
            <a
              key={difficulty}
              className="text-blue-600 hover:underline dark:text-blue-400"
              href={themeUrl(theme, difficulty)}
            >
              {capitalize(difficulty)}
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default function Page() {
  return (
    <>
      <div className="x-container mb-12">
        <Sudoku initTheme={Theme.Classic} initDifficulty={Difficulty.Easy} storagePrefix="" />
      </div>

      <div className="x-container post-block mb-12">
        <h1>{SITE_TITLE}</h1>
        <p>
          Play free Sudoku online — no download, no signup, and a fresh puzzle on every load. Pick a
          theme, pick a level, and the game saves your progress in the browser automatically.
        </p>
      </div>

      <ThemeCards />

      <div className="x-container post-block mb-12">
        <h2>Three themes, five levels</h2>
        <p>
          Every {SITE_TITLE} puzzle is generated on the spot and guaranteed to have exactly one
          solution. New to the game? Start with{' '}
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
            href={themeUrl(Theme.Classic, Difficulty.Easy)}
          >
            easy classic Sudoku
          </a>{' '}
          and work your way up. Already hooked?{' '}
          <a
            className="text-blue-600 hover:underline dark:text-blue-400"
            href={themeUrl(Theme.Classic, Difficulty.Crazy)}
          >
            crazy mode
          </a>{' '}
          is waiting. Each level has its own tips page — from simple scanning to X-Wings and
          candidate chains.
        </p>
      </div>
      <Abouts />
    </>
  );
}
