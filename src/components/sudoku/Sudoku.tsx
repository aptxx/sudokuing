'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
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
const DEFAULT_CHANCES = 64;

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

type Confirm = {
  title: string;
  message: string;
  action: () => void;
};

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
  const [notesMode, setNotesMode] = useState(false);
  const [difficulty, setDifficulty] = useState(initDifficulty);
  const [hints, setHints] = useState(DEFAULT_HINTS);
  const [chances, setChances] = useState(DEFAULT_CHANCES);
  const [chosenCell, setChosenCell] = useState(-1);
  const playtimeIntervalId = useRef<any>(null);
  const [playtime, setPlaytime] = useState(0); // seconds
  const [mistakes, setMistakes] = useState(0);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [rewardedKey, setRewardedKey] = useState<number>(0);
  const rewardedCaller = useRef<() => void>();
  // Set while navigating away after abandoning a game, so no state update can
  // re-save (and un-deprecate) the storage during the unload window.
  const navigating = useRef(false);

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

  const newGame = useCallback(
    (difficulty: Difficulty) => {
      const newPuzzle = generatePuzzle(difficulty);
      const newPuzzleSolved = sudoku.solve(newPuzzle) || '';
      setPuzzle(newPuzzle);
      setCells(puzzleToCells(newPuzzle, newPuzzleSolved));
      setNotes({});
      setNotesMode(false);
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
    },
    [clearPlaytimeInterval, newTimer]
  );

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
  }, [status, clearPlaytimeInterval, newTimer]);

  useEffect(() => {
    const gstate = loadGame(storagePrefix);
    if (gstate && validateGameState(gstate)) {
      setPuzzle(gstate.puzzle);
      setCells(gstate.cells);
      setNotes(gstate.notes || {});
      setDifficulty(gstate.difficulty || Difficulty.Easy);
      setPlaytime(loadPlaytime(storagePrefix));
      setHints(gstate.hints || DEFAULT_HINTS);
      setChances(gstate.chances || DEFAULT_CHANCES);
      setMistakes(gstate.mistakes || 0);
      // The effect cleanup above cleared the interval; keep the clock running.
      clearPlaytimeInterval();
      newTimer();
    } else {
      newGame(difficulty);
    }

    return () => {
      clearPlaytimeInterval();
    };
  }, [storagePrefix, difficulty, newGame, clearPlaytimeInterval, newTimer]);

  // Never persist an empty board: on the first mount commit this effect sees
  // the initial empty state, before loadGame's state has committed — writing
  // then would clobber a valid save from localStorage.
  useEffect(() => {
    if (Object.keys(cells).length === 0) {
      return;
    }
    saveGame(storagePrefix, {
      puzzle,
      cells,
      notes,
      difficulty,
      deprecated: 0,
      mistakes,
      hints,
      chances,
    });
  }, [storagePrefix, puzzle, cells, notes, difficulty, mistakes, hints, chances]);

  useEffect(() => {
    savePlaytime(playtime, storagePrefix);
  }, [playtime, storagePrefix]);

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
      if (navigating.current) {
        return;
      }
      if (cells && cells[pos]) {
        setChosenCell(pos);
      }
    },
    [cells, setChosenCell]
  );

  const handleKeyClick = useCallback(
    (value: string) => {
      if (navigating.current || status !== GameStatus.Playing) {
        return;
      }
      if (value === 'n' || value === 'N') {
        setNotesMode((prev) => !prev);
        return;
      }
      if (chosenCell === -1) {
        return;
      }
      const target = cells[chosenCell];
      if (!target || target.prefilled) {
        return;
      }

      if (value === 'Backspace') {
        if (notesMode) {
          setNotes((prev) => ({ ...prev, [chosenCell]: [] }));
        } else {
          const newCells = { ...cells };
          newCells[chosenCell] = { ...target, value: 0 };
          setCells(newCells);
        }
        return;
      }

      if (value.length === 1 && value >= '1' && value <= '9') {
        const newValue = Number(value);
        if (notesMode) {
          setNotes((prev) => {
            const current = prev[chosenCell] || [];
            const next = current.includes(newValue)
              ? current.filter((n) => n !== newValue)
              : [...current, newValue].sort((a, b) => a - b);
            return { ...prev, [chosenCell]: next };
          });
          return;
        }
        const newCells = { ...cells };
        newCells[chosenCell] = { ...target, value: newValue };
        setCells(newCells);
        setNotes((prev) => ({ ...prev, [chosenCell]: [] }));
        if (newValue !== target.answer) {
          setMistakes((v) => v + 1);
        }
      }
    },
    [status, chosenCell, cells, notesMode]
  );

  // The single physical-keyboard listener; on-screen keys call handleKeyClick directly.
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (confirm !== null || e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }
      handleKeyClick(e.key);
    };
    window.addEventListener('keyup', listener);
    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [handleKeyClick, confirm]);

  const togglePauseClick = useCallback(() => {
    if (status === GameStatus.Paused) {
      setStatus(GameStatus.Playing);
    } else if (status === GameStatus.Playing) {
      setStatus(GameStatus.Paused);
    }
  }, [status]);

  const handleHintClick = useCallback(() => {
    if (hints <= 0 || status !== GameStatus.Playing) {
      return;
    }
    let pos = chosenCell;
    const target = cells[pos];
    if (pos === -1 || !target || target.prefilled || target.value === target.answer) {
      const unsolved = Object.keys(cells).filter((k) => {
        const c = cells[Number(k)];
        return !c.prefilled && c.value !== c.answer;
      });
      if (unsolved.length === 0) {
        return;
      }
      pos = Number(unsolved[Math.floor(Math.random() * unsolved.length)]);
    }
    const hinted = cells[pos];
    const newCells = { ...cells };
    newCells[pos] = { ...hinted, value: hinted.answer };
    setCells(newCells);
    setNotes((prev) => ({ ...prev, [pos]: [] }));
    setHints((v) => v - 1);
    setChosenCell(pos);
    sendGTMEvent({ event: 'hint_used' });
  }, [hints, status, chosenCell, cells]);

  const confirmNewGame = useCallback(() => {
    setConfirm({
      title: 'Continue?',
      message: 'Creating a new game will clear the current puzzle.',
      action: () => newGame(difficulty),
    });
  }, [newGame, difficulty]);

  const handleDifficultyClick = useCallback(
    (theme: Theme, newDifficulty: Difficulty) => {
      if (newDifficulty === difficulty) {
        return;
      }
      const link = theme === Theme.Classic ? `/${newDifficulty}` : `/${theme}/${newDifficulty}`;
      const abandon = () => {
        navigating.current = true;
        // Mark the save as deprecated so the destination page starts fresh.
        saveGame(storagePrefix, {
          puzzle,
          cells,
          notes,
          difficulty,
          deprecated: 1,
          mistakes,
          hints,
          chances,
        });
        window.location.href = link;
      };
      if (status === GameStatus.Playing) {
        setConfirm({
          title: 'Switch difficulty?',
          message: 'Changing difficulty will discard your current puzzle.',
          action: abandon,
        });
      } else {
        abandon();
      }
    },
    [difficulty, status, puzzle, cells, notes, storagePrefix, mistakes, hints, chances]
  );

  const goSecondChance = useCallback(() => {
    if (chances > 0) {
      setMistakes((prev) => prev - 1);
      setChances((prev) => prev - 1);
      setStatus(GameStatus.Playing);
    }
  }, [chances]);

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
    }, 500);
  }, [goSecondChance]);

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
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-medium text-gray-500 dark:text-gray-200">
        <div className="text-base font-bold sm:text-lg">
          <DifficultySelect
            theme={themed.type()}
            current={difficulty}
            onClick={handleDifficultyClick}
          />
        </div>
        <div
          className={classnames('text-base sm:text-lg', {
            'font-bold text-red-500 dark:text-red-400': mistakes >= DEFAULT_MAX_MISTAKES,
          })}
        >
          Mistakes: {`${mistakes}/${DEFAULT_MAX_MISTAKES + 1}`}
        </div>
        <div className="flex items-center justify-center text-base sm:text-lg">
          <span>{formatPlaytime(playtime)}</span>
          <button
            type="button"
            aria-label={status === GameStatus.Paused ? 'Resume game' : 'Pause game'}
            onClick={togglePauseClick}
            className="ml-1 rounded p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {status === GameStatus.Paused ? (
              <PlayIcon className="h-4 w-4" />
            ) : (
              <PauseIcon className="h-4 w-4" />
            )}
          </button>
        </div>
        <button
          type="button"
          onClick={handleHintClick}
          disabled={hints <= 0}
          className={classnames(
            'rounded border px-2 py-0.5 text-sm font-bold',
            hints > 0
              ? 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
              : 'pointer-events-none border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600'
          )}
        >
          Hint ({hints})
        </button>
      </div>
      <div className="mt-2 flex flex-row justify-center">
        <div className="w-full max-w-sm sm:w-[404px] sm:max-w-none lg:w-[480px]">
          <BoardMemoized
            themed={themed}
            cells={cells}
            notes={notes}
            chosen={chosenCell}
            status={status}
            chances={chances}
            difficulty={difficulty}
            playtime={playtime}
            mistakes={mistakes}
            onCellClick={handleCellChosen}
            onResumeClick={togglePauseClick}
            onNewGameClick={() => newGame(difficulty)}
            onSecondChanceClick={handleSecondChance}
          />
        </div>
        <div className="ml-8 hidden sm:block sm:w-48 lg:w-56">
          <KeyboardHorizontal
            themed={themed}
            notesMode={notesMode}
            onClick={handleKeyClick}
            onNewGameClick={confirmNewGame}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center sm:hidden">
        <div className="w-full max-w-sm">
          <hr className="my-4 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          <Keyboard
            themed={themed}
            notesMode={notesMode}
            onClick={handleKeyClick}
            onNewGameClick={confirmNewGame}
          />
        </div>
      </div>
      <NewGameModal
        open={confirm !== null}
        title={confirm?.title}
        message={confirm?.message}
        handleClose={() => {
          setConfirm(null);
        }}
        handleConfirm={() => {
          confirm?.action();
          setConfirm(null);
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
        className="flex max-h-[90px] w-full items-center justify-center overflow-hidden"
        id="div-gpt-ad-0"
        adunit={DFP_BANNER_ADUNIT}
        sizes={[[300, 50], [468, 60], [728, 90], [970, 90], 'fluid']}
        sizeMapping={[
          { viewport: [1200, 600], sizes: [[468, 60], [728, 90], [970, 90], 'fluid'] },
          { viewport: [1000, 600], sizes: [[468, 60], [728, 90], 'fluid'] },
          { viewport: [700, 400], sizes: [[468, 60], [300, 50], 'fluid'] },
          { viewport: [360, 400], sizes: [[300, 50], 'fluid'] },
          { viewport: [0, 0], sizes: ['fluid'] },
        ]}
      />
    </>
  );
}
