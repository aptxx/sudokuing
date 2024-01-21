import Sudoku from '@/components/sudoku/Sudoku';
import { Difficulty, Theme } from '@/constants/constants';
import { generateBaseMetadata } from '@/lib/seo';
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

export default function Home({ params, searchParams }: Props) {
  const jsonLd = generateBaseMetadata(Theme.Classic, params.difficulty as Difficulty);

  return (
    <div className="h-full w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Sudoku
        initDifficulty={params.difficulty as Difficulty}
        initTheme={Theme.Classic}
        storagePrefix=""
      />
    </div>
  );
}
