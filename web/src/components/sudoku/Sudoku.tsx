'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import sudoku from '@/lib/sudoku';
import { Difficulty, Theme, GameStatus, CellValue } from './types';
import { Board } from '@/components/board/Board';
import { generatePuzzle, puzzleToCells } from '@/lib/utils';
import { KeyboardHorizontal } from '@/components/keyboard/KeyboardHorizontal';
import { Keyboard } from '@/components/keyboard/Keyboard';
import { NewGameModal } from '@/components/modals/NewGameModal';
import DifficultySelect from './DifficultySelect';
import { loadGame, loadPlaytime, saveGame, savePlaytime } from './storage';
import themeClassic from '@/app/(sudokus)/classic/[difficulty]/theme';
import themeAlphabet from '@/app/(sudokus)/alphabet/[difficulty]/theme';
import themeColor from '@/app/(sudokus)/color/[difficulty]/theme';
import { GameState } from './types';
import { RewardedAd } from '../common/dfp/RewardedAd';
import { DFP_BANNER_ADUNIT, DFP_REWARDED_ADUNIT } from '@/config/setting';
import BannerAd from '../common/dfp/BannerAd';

const DEFAULT_MAX_MISTAKES = 2;
const DEFAULT_HINTS = 2;
const DEFAULT_CHANCES = 2;

function validateGameState(state: GameState): boolean {
  if (!state) {
    return false;
  }
  if (state.deprecated) {
    return false;
  }
  if (!state.cells || Object.keys(state.cells).length == 0) {
    return false;
  }
  return true;
}

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

const BoardMemoized = memo(Board);

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
  const [status, setStatus] = useState(GameStatus.Playing);
  const [puzzle, setPuzzle] = useState('');
  const [cells, setCells] = useState({} as { [key: number]: CellValue });
  const [notes, setNotes] = useState({} as { [key: number]: number[] });
  const [difficulty, setDifficulty] = useState(initDifficulty);
  const [deprecated, setDeprecated] = useState(0);
  const [hints, setHints] = useState(DEFAULT_HINTS);
  const [chances, setChances] = useState(DEFAULT_CHANCES);
  const [chosenCell, setChosenCell] = useState(-1);
  const playtimeIntervalId = useRef<any>(null);
  const [playtime, setPlaytime] = useState(0); // seconds
  const [mistakes, setMistakes] = useState(0);
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false);
  const [rewardedKey, setRewardedKey] = useState<number>(0);
  const rewardedCaller = useRef<() => void>();

  const themed = getThemed(initTheme);

  const clearPlaytimeInterval = useCallback(() => {
    const iid = playtimeIntervalId.current;
    playtimeIntervalId.current = null;
    clearInterval(iid);
  }, []);

  const newTimer = useCallback(() => {
    let prev = Date.now();
    let newIntervalId = setInterval(() => {
      const now = Date.now();
      const delta = Math.max(0, Math.floor((now - prev) / 1000));
      if (delta > 0) {
        prev = now;
        setPlaytime((passed) => Math.max(0, passed + delta));
      }
    }, 100);
    playtimeIntervalId.current = newIntervalId;
  }, []);

  const newGame = (difficulty: Difficulty) => {
    const newPuzzle = generatePuzzle(difficulty);
    const newPuzzleSolved = sudoku.solve(newPuzzle) || '';
    setPuzzle(newPuzzle);
    setCells(puzzleToCells(newPuzzle, newPuzzleSolved));
    setNotes({});
    setDifficulty(difficulty);
    setHints(DEFAULT_HINTS);
    setChances(DEFAULT_CHANCES);
    clearPlaytimeInterval();
    setPlaytime(0);
    setMistakes(0);
    setChosenCell(-1);
    setStatus(GameStatus.Playing);
    newTimer();
    sendGTMEvent({ event: 'level_start' });
  };

  // watch game status to update timer
  useEffect(() => {
    if (status !== GameStatus.Playing) {
      clearPlaytimeInterval();
      return;
    }
    if (playtimeIntervalId.current) {
      return;
    }
    newTimer();
  }, [status]);

  useEffect(() => {
    const gstate = loadGame(storagePrefix);
    if (gstate && validateGameState(gstate)) {
      setPuzzle(gstate.puzzle);
      setCells(gstate.cells);
      setNotes(gstate.notes || []);
      setDifficulty(gstate.difficulty || Difficulty.Easy);
      setPlaytime(loadPlaytime(storagePrefix));
      setHints(gstate.hints || DEFAULT_HINTS);
      setChances(gstate.chances || DEFAULT_CHANCES);
      setMistakes(gstate.mistakes || 0);
    } else {
      newGame(difficulty);
    }

    return () => {
      clearPlaytimeInterval();
    };
  }, []);

  useEffect(() => {
    saveGame(storagePrefix, {
      puzzle,
      cells,
      notes,
      difficulty,
      deprecated,
      mistakes,
      hints,
      chances,
    });
  }, [storagePrefix, puzzle, cells, notes, difficulty, deprecated, mistakes, hints, chances]);

  useEffect(() => {
    savePlaytime(playtime, storagePrefix);
  }, [playtime]);

  useEffect(() => {
    if (mistakes > DEFAULT_MAX_MISTAKES) {
      setStatus(GameStatus.GameOver);
    }
  }, [mistakes]);

  useEffect(() => {
    let win = true;
    for (const pos in cells) {
      const val = cells[pos];
      win = win && val.value === val.answer;
    }

    if (win && Object.keys(cells).length > 0) {
      setStatus(GameStatus.GameSolved);
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

  const handleNewGame = useCallback(() => {
    newGame(difficulty);
  }, [difficulty]);

  const handleSecondChance = useCallback(() => {
    const f = rewardedCaller.current;
    if (f) {
      f();
      return;
    }

    setTimeout(() => {
      const f2 = rewardedCaller.current;
      if (f2) {
        f2();
      } else {
        goSecondChance();
      }
    }, 1000);
  }, []);

  const goSecondChance = useCallback(() => {
    if (chances > 0) {
      setMistakes((prev) => prev - 1);
      setChances((prev) => prev - 1);
      setStatus(GameStatus.Playing);
    }
  }, [chances]);

  const handleRewardedReady = useCallback((event: any) => {
    console.log('DFP: rewarded ad ready');
    rewardedCaller.current = () => {
      event.makeRewardedVisible();
    };
  }, []);

  const handleRewardedClosed = useCallback((event: any) => {
    rewardedCaller.current = undefined;
    setRewardedKey((prev) => prev + 1);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center font-medium text-gray-500 dark:text-gray-200">
        <div className="text-base font-bold sm:text-lg">
          <DifficultySelect
            theme={themed.type()}
            current={difficulty}
            onClick={handleDifficultyClick}
          />
        </div>
        <div className="ml-4">Mistakes: {`${mistakes}`}</div>
        <div className="ml-4 flex items-center justify-center">
          <span>{formatPlaytime(playtime)}</span>
          <div className="ml-1 hover:cursor-pointer" onClick={togglePauseClick}>
            {status === GameStatus.Paused ? (
              <PlayIcon className="h-4 w-4" />
            ) : (
              <PauseIcon className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-center">
        <div className="w-full max-w-sm sm:w-[404px] sm:max-w-none">
          <BoardMemoized
            themed={themed}
            cells={cells}
            notes={notes}
            chosen={chosenCell}
            status={status}
            chances={chances}
            onCellClick={handleCellChosen}
            onResumeClick={togglePauseClick}
            onNewGameClick={handleNewGame}
            onSecondChanceClick={handleSecondChance}
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
      <NewGameModal
        open={isNewGameModalOpen}
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
      <RewardedAd
        key={rewardedKey}
        adunit={DFP_REWARDED_ADUNIT}
        onRewardReady={handleRewardedReady}
        onRewardGranted={goSecondChance}
        onRewardClosed={handleRewardedClosed}
      />
      <div className="mt-8"></div>
      <BannerAd
        className="max-h-[90px] w-full overflow-hidden"
        id="div-gpt-ad-0"
        adunit={DFP_BANNER_ADUNIT}
        sizes={[[468, 60], [728, 90], 'fluid']}
        sizeMapping={[
          { viewport: [1000, 600], sizes: [[468, 60], [728, 90], 'fluid'] },
          { viewport: [700, 400], sizes: [[468, 60], 'fluid'] },
          { viewport: [0, 0], sizes: ['fluid'] },
        ]}
      />
    </>
  );
}
