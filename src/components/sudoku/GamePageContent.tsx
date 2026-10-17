import { ReactNode } from 'react';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { capitalize } from '@/lib/utils';
import { difficultyContent, themeContent } from '@/lib/content';
import { BASE_URL } from '@/config/setting';

type Props = {
  theme: Theme;
  difficulty: Difficulty;
  /** The theme's symbol palette, rendered inline in the intro. */
  elements: ReactNode;
};

export default function GamePageContent({ theme, difficulty, elements }: Props) {
  const themeCap = capitalize(theme);
  const difficultyCap = capitalize(difficulty);
  const { about, howToPlayIntro, rules } = themeContent[theme];
  const { intro, tipsIntro, tips } = difficultyContent[difficulty];
  const pageIntro = intro[theme];

  const levelUrl = (d: Difficulty) =>
    theme === Theme.Classic ? `${BASE_URL}/${d}` : `${BASE_URL}/${theme}/${d}`;

  return (
    <>
      <div className="x-container post-block mb-12">
        <h1>{`${themeCap} Sudoku ${difficultyCap}`}</h1>
        <p>
          {pageIntro} Every cell takes one of nine symbols: {elements}.
        </p>
      </div>
      <div className="x-container post-block mb-12">
        <h2>{`How to play ${themeCap} Sudoku`}</h2>
        <p className="mb-2">{howToPlayIntro}</p>
        <ul>
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
      <div className="x-container post-block mb-12">
        <h2>{`${difficultyCap} Sudoku tips`}</h2>
        <p className="mb-2">{tipsIntro}</p>
        <ul>
          {tips.map((tip) => (
            <li key={tip.title}>
              <b>{tip.title}.</b> {tip.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="x-container post-block mb-12">
        <h2>{`About ${themeCap} Sudoku`}</h2>
        <p>{about}</p>
      </div>
      <div className="x-container post-block mb-12">
        <h2>{`More ${themeCap} Sudoku levels`}</h2>
        <p>
          {Object.values(Difficulty)
            .filter((d) => d !== difficulty)
            .map((d, i, rest) => (
              <span key={d}>
                <a className="text-blue-600 hover:underline dark:text-blue-400" href={levelUrl(d)}>
                  {`${themeCap} Sudoku ${capitalize(d)}`}
                </a>
                {i < rest.length - 1 ? ' · ' : ''}
              </span>
            ))}
        </p>
      </div>
    </>
  );
}
