import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { generateBaseMetadata, generateLinkedData } from '@/lib/seo';
import GamePageContent from '@/components/sudoku/GamePageContent';
import ElementsLine from '@/components/common/ElementsLine';
import themeconfig from './theme';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ difficulty: string }>;
};

function parseDifficulty(value: string): Difficulty {
  if (!Object.values(Difficulty).includes(value as Difficulty)) {
    notFound();
  }
  return value as Difficulty;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { difficulty } = await params;
  return generateBaseMetadata(Theme.Alphabet, parseDifficulty(difficulty));
}

export default async function Page({ params }: Props) {
  const theme = Theme.Alphabet;
  const { difficulty } = await params;
  const jsonLd = generateLinkedData(theme, parseDifficulty(difficulty));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="x-container mb-12">
        <Sudoku
          initTheme={theme}
          initDifficulty={parseDifficulty(difficulty)}
          storagePrefix={`${theme}_`}
        />
      </div>
      <GamePageContent
        theme={theme}
        difficulty={parseDifficulty(difficulty)}
        elements={<ElementsLine elements={themeconfig.getElements()} />}
      />
    </>
  );
}
