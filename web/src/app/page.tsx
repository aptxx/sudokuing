import React from 'react';
import type { Metadata } from 'next';
import { BASE_URL } from '@/config/setting';
import Sudoku from '@/components/sudoku/Sudoku';

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
      <div className="my-4"></div>
      <Sudoku />
    </div>
  );
}
