'use client';

import { useEffect, useState } from 'react';
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
};

function loadGameState(): null | GameState {
  const data = localStorage.getItem('game_state');
  if (!data) {
    return null;
  }
  return JSON.parse(data);
}

function saveGameState(state: GameState) {
  localStorage.setItem('game_state', JSON.stringify(state));
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
};

export default function Sudoku({
  initTheme = Theme.Classic,
  initDifficulty = Difficulty.Easy,
}: Props) {
  const [theme, setTheme] = useState(initTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [status, setStatus] = useState(GameStatus.Playing);
  const [puzzle, setPuzzle] = useState('');
  const [cells, setCells] = useState({} as { [key: number]: CellValue });
  const [notes, setNotes] = useState({} as { [key: number]: number[] });
  const [difficulty, setDifficulty] = useState(initDifficulty);
  const [chosenCell, setChosenCell] = useState(-1);
  const [isGameSolvedModalOpen, setIsGameSolvedModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);

  const newGame = (difficulty: Difficulty) => {
    const newPuzzle = generateGame(difficulty);
    const newPuzzleSolved = sudoku.solve(newPuzzle) || '';
    setPuzzle(newPuzzle);
    setCells(puzzleToCells(newPuzzle, newPuzzleSolved));
    setNotes({});
    setDifficulty(difficulty);
  };

  useEffect(() => {
    setIsDarkMode(
      localStorage.getItem('color-scheme')
        ? localStorage.getItem('color-scheme') === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? true
          : false
    );

    const gameState = loadGameState();
    if (gameState) {
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
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    saveGameState({ puzzle, cells, notes, difficulty });
  }, [puzzle, cells, notes, difficulty]);

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

  const handleCellChosen = (pos: number) => {
    if (!cells) {
      return;
    }
    const clicked = cells[pos];
    if (clicked && !clicked.prefilled) {
      setChosenCell(pos);
    }
  };

  const handleKeyClick = (value: string) => {
    if (chosenCell === -1) {
      return;
    }
    const newCells = { ...cells };
    const newChosenCell = { ...newCells[chosenCell] };
    if (value === 'Backspace') {
      newChosenCell.value = 0;
    } else if (value.length === 1 && value >= '1' && value <= '9') {
      newChosenCell.value = Number(value);
    } else {
      // pass
    }
    newCells[chosenCell] = newChosenCell;

    setCells(newCells);
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="w-full max-w-sm sm:w-[512px] sm:max-w-none">
          <Board cells={cells} notes={notes} chosen={chosenCell} onCellClick={handleCellChosen} />
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
