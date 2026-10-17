import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { generateBaseMetadata, generateLinkedData } from '@/lib/seo';
import GamePageContent from '@/components/sudoku/GamePageContent';
import ElementsLine from '@/components/common/ElementsLine';
import themeconfig from './theme';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ difficulty: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(Difficulty).map((difficulty) => ({ difficulty }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { difficulty } = await params;
  return generateBaseMetadata(Theme.Color, difficulty as Difficulty);
}

export default async function Page({ params }: Props) {
  const theme = Theme.Color;
  const { difficulty } = await params;
  const jsonLd = generateLinkedData(theme, difficulty as Difficulty);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="x-container mb-12">
        <Sudoku
          initTheme={theme}
          initDifficulty={difficulty as Difficulty}
          storagePrefix={`${theme}_`}
        />
      </div>
      <GamePageContent
        theme={theme}
        difficulty={difficulty as Difficulty}
        elements={<ElementsLine elements={themeconfig.getElements()} />}
      />
    </>
  );
}
