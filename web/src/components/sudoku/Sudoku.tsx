'use client';

import { useCallback, useEffect, useState } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import sudoku from '@/lib/sudoku';
import { Difficulty, Theme, GameStatus, CellValue } from './types';
import { Board } from '@/components/board/Board';
import { generatePuzzle, puzzleToCells } from '@/lib/utils';
import { KeyboardHorizontal } from '@/components/keyboard/KeyboardHorizontal';
import { Keyboard } from '@/components/keyboard/Keyboard';
import { GameSolvedModal } from '@/components/modals/GameSolvedModal';
import { GameOverModal } from '@/components/modals/GameOverModal';
import { NewGameModal } from '@/components/modals/NewGameModal';
import DifficultySelect from './DifficultySelect';
import { loadGame, loadPlaytime, saveGame, savePlaytime } from './storage';
import themeClassic from '@/app/classic/[difficulty]/themeconfig';
import themeAlphabet from '@/app/alphabet/[difficulty]/themeconfig';
import themeColor from '@/app/color/[difficulty]/themeconfig';

function formatPlaytime(n: number) {
  const minutes = Math.floor(n / 60);
  const seconds = n % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getThemed(theme: Theme) {
  if (theme === Theme.Classic) {
    return themeClassic;
  } else if (theme === Theme.Alphabet) {
    return themeAlphabet;
  } else if (theme === Theme.Color) {
    return themeColor;
  }
  return themeClassic;
}

type Props = {
  initTheme: Theme;
  initDifficulty?: Difficulty;
  storagePrefix?: string;
};

export default function Sudoku({
  initTheme = Theme.Classic,
  initDifficulty = Difficulty.Easy,
  storagePrefix = '',
}: Props) {
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
  const [mistakes, setMistakes] = useState(0);
  const [isGameSolvedModalOpen, setIsGameSolvedModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  const themed = getThemed(initTheme);

  const clearPlaytimeInterval = useCallback(() => {
    playtimeIntervalId && clearInterval(playtimeIntervalId);
    setPlaytimeIntervalId(null);
  }, [playtimeIntervalId, setPlaytimeIntervalId]);

  const newTimer = useCallback(() => {
    if (!!playtimeIntervalId) {
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
  }, [setPlaytime, playtimeIntervalId, setPlaytimeIntervalId]);

  const newGame = (difficulty: Difficulty) => {
    const newPuzzle = generatePuzzle(difficulty);
    const newPuzzleSolved = sudoku.solve(newPuzzle) || '';
    setPuzzle(newPuzzle);
    setCells(puzzleToCells(newPuzzle, newPuzzleSolved));
    setNotes({});
    setDifficulty(difficulty);
    clearPlaytimeInterval();
    setPlaytime(0);
    setMistakes(0);
    setChosenCell(-1);
    setStatus(GameStatus.Playing);
  };

  // watch game status to update timer
  useEffect(() => {
    if (status !== GameStatus.Playing) {
      clearPlaytimeInterval();
      return;
    }
    if (playtimeIntervalId) {
      return;
    }
    newTimer();
  }, [status, playtimeIntervalId, clearPlaytimeInterval]);

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
      setPuzzle(gameState.puzzle);
      setCells(gameState.cells);
      setNotes(gameState.notes || []);
      setDifficulty(gameState.difficulty || Difficulty.Easy);
      setPlaytime(loadPlaytime(storagePrefix));
      setMistakes(gameState.mistakes || 0);
    } else {
      newGame(difficulty);
    }

    return () => {
      clearPlaytimeInterval();
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
    saveGame(storagePrefix, { puzzle, cells, notes, difficulty, deprecated, mistakes });
  }, [storagePrefix, puzzle, cells, notes, difficulty, deprecated, mistakes]);

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
          const newValue = Number(value);
          newChosenCell.value = newValue;
          if (newChosenCell.value !== newChosenCell.answer) {
            setMistakes((v) => v + 1);
          }
        }

        newCells[chosenCell] = newChosenCell;
        setCells(newCells);
      }
    },
    [status, chosenCell, cells, setCells]
  );

  const togglePauseClick = useCallback(() => {
    if (status === GameStatus.Paused) {
      setStatus(GameStatus.Playing);
    } else if (status === GameStatus.Playing) {
      setStatus(GameStatus.Paused);
    }
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
          <DifficultySelect
            theme={themed.type()}
            current={difficulty}
            onClick={handleDifficultyClick}
          />
        </div>
        <div className="ml-4">Mistakes: {`${mistakes}`}</div>
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
        <div className="w-full max-w-sm sm:w-[404px] sm:max-w-none">
          <Board
            themed={themed}
            cells={cells}
            notes={notes}
            chosen={chosenCell}
            status={status}
            onCellClick={handleCellChosen}
            onResumeClick={togglePauseClick}
          />
        </div>
        <div className="ml-8 hidden sm:block sm:w-48">
          <KeyboardHorizontal
            themed={themed}
            onClick={handleKeyClick}
            onNewGameClick={() => setIsNewGameModalOpen(true)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:hidden">
        <div className="w-full max-w-sm">
          <hr className="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <Keyboard
            themed={themed}
            onClick={handleKeyClick}
            onNewGameClick={() => setIsNewGameModalOpen(true)}
          />
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
