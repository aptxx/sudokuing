'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import sudoku from '@/lib/sudoku';
import { Difficulty, Theme } from '@/constants/constants';
import { Board } from '@/components/board/Board';
import { puzzleToCells } from '@/lib/utils';
import { CellValue } from '@/components/board/Cell';
import { KeyboardHorizontal } from '@/components/keyboard/KeyboardHorizontal';
import { Keyboard } from '@/components/keyboard/Keyboard';
import { GameSolvedModal } from '../modals/GameSolvedModal';
import { GameOverModal } from '../modals/GameOverModal';
import { NewGameModal } from '../modals/NewGameModal';
import DifficultySelect from './DifficultySelect';
import { deprecate } from 'util';

enum GameStatus {
  Playing,
  Paused,
  GameOver,
  GameSolved,
}

type GameState = {
  puzzle: string;
  cells: { [key: number]: CellValue };
  notes: { [key: number]: number[] };
  difficulty: Difficulty;
  deprecated: number;
};

function loadGame(prefix: string): null | GameState {
  const data = localStorage.getItem(`${prefix || ''}game`);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

function saveGame(state: GameState, prefix: string) {
  localStorage.setItem(`${prefix || ''}game`, JSON.stringify(state));
}

function loadPlaytime(prefix: string): number {
  return +(localStorage.getItem(`${prefix || ''}playtime`) || '') || 0;
}

function savePlaytime(playtime: number, prefix: string) {
  localStorage.setItem(`${prefix || ''}playtime`, playtime.toString());
}

function formatPlaytime(n: number) {
  const minutes = Math.floor(n / 60);
  const seconds = n % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function generateGame(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Easy:
      return sudoku.generate('medium');
    case Difficulty.Medium:
      return sudoku.generate('hard');
    case Difficulty.Hard:
      return sudoku.generate('very-hard');
    case Difficulty.Expert:
      return sudoku.generate('insane');
    case Difficulty.Crazy:
      return sudoku.generate('inhuman');
    default:
      return sudoku.generate('medium');
  }
}

type Props = {
  initTheme?: Theme;
  initDifficulty?: Difficulty;
  storagePrefix?: string;
};

export default function Sudoku({
  initTheme = Theme.Classic,
  initDifficulty = Difficulty.Easy,
  storagePrefix = '',
}: Props) {
  const [theme, setTheme] = useState(initTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [status, setStatus] = useState(GameStatus.Playing);
  const [puzzle, setPuzzle] = useState('');
  const [cells, setCells] = useState({} as { [key: number]: CellValue });
  const [notes, setNotes] = useState({} as { [key: number]: number[] });
  const [difficulty, setDifficulty] = useState(initDifficulty);
  const [deprecated, setDeprecated] = useState(0);
  const [chosenCell, setChosenCell] = useState(-1);
  const [playtimeIntervalId, setPlaytimeIntervalId] = useState<any>(null);
  const [playtime, setPlaytime] = useState(0); // seconds
  const [isGameSolvedModalOpen, setIsGameSolvedModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  const cleanPlaytimeInterval = useCallback(() => {
    playtimeIntervalId && clearInterval(playtimeIntervalId);
    setPlaytimeIntervalId(null);
  }, [playtimeIntervalId, setPlaytimeIntervalId]);

  const newGame = (difficulty: Difficulty) => {
    const newPuzzle = generateGame(difficulty);
    const newPuzzleSolved = sudoku.solve(newPuzzle) || '';
    setPuzzle(newPuzzle);
    setCells(puzzleToCells(newPuzzle, newPuzzleSolved));
    setNotes({});
    setDifficulty(difficulty);
    setPlaytime(0);
  };

  // watch game status to update timer
  useEffect(() => {
    if (status !== GameStatus.Playing) {
      cleanPlaytimeInterval();
      return;
    }
    if (playtimeIntervalId) {
      return;
    }
    let prev = Date.now();
    let newIntervalId = setInterval(() => {
      const now = Date.now();
      const delta = Math.max(0, Math.floor((now - prev) / 1000));
      if (delta > 0) {
        prev = now;
        setPlaytime((passed) => Math.max(0, passed + delta));
      }
    }, 100);
    setPlaytimeIntervalId(newIntervalId);
  }, [status, setPlaytime, playtimeIntervalId, setPlaytimeIntervalId]);

  useEffect(() => {
    setIsDarkMode(
      localStorage.getItem('color-scheme')
        ? localStorage.getItem('color-scheme') === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? true
          : false
    );

    const gameState = loadGame(storagePrefix);
    if (gameState && !gameState.deprecated) {
      try {
        setPuzzle(gameState.puzzle);
        setCells(gameState.cells);
        setNotes(gameState.notes);
        setDifficulty(gameState.difficulty);
      } catch (e) {
        console.log(`load game state failed: ${e}`);
        newGame(difficulty);
      }
    } else {
      newGame(difficulty);
    }

    setPlaytime(loadPlaytime(storagePrefix));

    return () => {
      cleanPlaytimeInterval();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    saveGame({ puzzle, cells, notes, difficulty, deprecated }, storagePrefix);
  }, [storagePrefix, puzzle, cells, notes, difficulty, deprecated]);

  useEffect(() => {
    savePlaytime(playtime, storagePrefix);
  }, [playtime]);

  useEffect(() => {
    let win = true;
    for (const pos in cells) {
      const val = cells[pos];
      win = win && val.value === val.answer;
    }

    if (win && Object.keys(cells).length > 0) {
      setStatus(GameStatus.GameSolved);
      setIsGameSolvedModalOpen(true);
    }
  }, [cells]);

  const handleCellChosen = useCallback(
    (pos: number) => {
      if (!cells) {
        return;
      }
      const clicked = cells[pos];
      if (clicked && !clicked.prefilled) {
        setChosenCell(pos);
      }
    },
    [cells, setChosenCell]
  );

  const handleKeyClick = useCallback(
    (value: string) => {
      if (chosenCell === -1) {
        return;
      }
      if (status === GameStatus.Playing) {
        const newCells = { ...cells };
        const newChosenCell = { ...newCells[chosenCell] };
        if (value === 'Backspace') {
          newChosenCell.value = 0;
        } else if (value.length === 1 && value >= '1' && value <= '9') {
          newChosenCell.value = Number(value);
        }

        newCells[chosenCell] = newChosenCell;
        setCells(newCells);
      }
    },
    [status, chosenCell, cells, setCells]
  );

  const togglePauseClick = useCallback(() => {
    setStatus(status === GameStatus.Paused ? GameStatus.Playing : GameStatus.Paused);
  }, [status]);

  const handleDifficultyClick = useCallback(
    (theme: Theme, newDifficulty: Difficulty) => {
      if (newDifficulty === difficulty) {
        return;
      }
      setDeprecated(1);
    },
    [difficulty]
  );

  return (
    <>
      <div className="flex items-center justify-center font-medium text-gray-500">
        <div className="text-base font-bold text-gray-600 sm:text-lg">
          <DifficultySelect theme={theme} current={difficulty} onClick={handleDifficultyClick} />
        </div>
        <div className="ml-4 flex items-center justify-center">
          <span>{formatPlaytime(playtime)}</span>
          <button className="ml-1" onClick={togglePauseClick}>
            {status === GameStatus.Paused ? (
              <PlayIcon className="h-4 w-4" />
            ) : (
              <PauseIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-center">
        <div className="w-full max-w-sm sm:w-[512px] sm:max-w-none">
          <Board
            cells={cells}
            notes={notes}
            chosen={chosenCell}
            onCellClick={handleCellChosen}
            paused={status === GameStatus.Paused}
            onResumeClick={togglePauseClick}
          />
        </div>
        <div className="ml-8 hidden sm:block sm:w-48">
          <KeyboardHorizontal
            onClick={handleKeyClick}
            onNewGameClick={() => setIsNewGameModalOpen(true)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:hidden">
        <div className="w-full max-w-sm">
          <hr className="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <Keyboard onClick={handleKeyClick} onNewGameClick={() => setIsNewGameModalOpen(true)} />
        </div>
      </div>
      <GameSolvedModal
        isOpen={isGameSolvedModalOpen}
        handleClose={() => {
          setIsGameSolvedModalOpen(false);
        }}
        handleNewGame={() => {
          newGame(difficulty);
          setIsGameSolvedModalOpen(false);
        }}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        handleClose={() => {
          setIsGameOverModalOpen(false);
        }}
      />
      <NewGameModal
        isOpen={isNewGameModalOpen}
        handleClose={() => {
          setIsNewGameModalOpen(false);
        }}
        handleConfirm={() => {
          newGame(difficulty);
          setIsNewGameModalOpen(false);
        }}
        handleCancel={() => {
          setIsNewGameModalOpen(false);
        }}
      />
    </>
  );
}
