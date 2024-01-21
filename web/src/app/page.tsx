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
    <div className="h-full w-full">
      <Sudoku initDifficulty={Difficulty.Easy} initTheme={Theme.Classic} storagePrefix="" />
    </div>
  );
}
