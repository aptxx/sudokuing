import { Difficulty, Theme } from '@/components/sudoku/types';

export type ThemeContent = {
  about: string;
  howToPlayIntro: string;
  rules: string[];
};

export const themeContent: Record<Theme, ThemeContent> = {
  [Theme.Classic]: {
    about:
      'Classic Sudoku is the puzzle as it has been played for decades: a 9×9 grid, the digits 1–9, and one rule repeated three ways. It is still the most-played logic game in the world, and the level most solvers use to measure their speed.',
    howToPlayIntro:
      'The board is a 9×9 grid divided into nine 3×3 boxes. Fill every empty cell so that each digit appears exactly once per row, column and box. Every puzzle we serve has a single valid solution.',
    rules: [
      'Each row contains the digits 1–9 exactly once.',
      'Each column contains the digits 1–9 exactly once.',
      'Each 3×3 box contains the digits 1–9 exactly once.',
      'Prefilled cells are fixed clues — everything else you deduce.',
    ],
  },
  [Theme.Alphabet]: {
    about:
      'Alphabet Sudoku swaps the digits 1–9 for the letters A–I. The logic is identical, but scanning feels different: your word-game brain takes over, and pairs like D/F start jumping out the way 4/5 do in a classic grid.',
    howToPlayIntro:
      'Play exactly like classic Sudoku, only with letters. Fill the grid so that every row, column and 3×3 box contains each letter from A to I exactly once.',
    rules: [
      'Each row contains the letters A–I exactly once.',
      'Each column contains the letters A–I exactly once.',
      'Each 3×3 box contains the letters A–I exactly once.',
      'Prefilled letters are fixed clues — everything else you deduce.',
    ],
  },
  [Theme.Color]: {
    about:
      'Color Sudoku replaces symbols with a palette of nine colors. Deduction becomes visual — a repeated hue catches the eye faster than a repeated digit — which makes it a favorite for kids and for solvers who want a change of sense, not of logic.',
    howToPlayIntro:
      'Pick from the nine-color palette so that every row, column and 3×3 box ends up holding all nine colors, each exactly once.',
    rules: [
      'Each row shows all nine colors exactly once.',
      'Each column shows all nine colors exactly once.',
      'Each 3×3 box shows all nine colors exactly once.',
      'Prefilled colors are fixed clues — everything else you deduce.',
    ],
  },
};

export type DifficultyContent = {
  /** Short blurb for the meta description of any theme at this level. */
  meta: string;
  /** Unique intro paragraph per theme. */
  intro: Record<Theme, string>;
  tipsIntro: string;
  tips: { title: string; text: string }[];
};

export const difficultyContent: Record<Difficulty, DifficultyContent> = {
  [Difficulty.Easy]: {
    meta: 'a relaxed grid that teaches scanning and rewards clean habits',
    intro: {
      [Theme.Classic]:
        'This Easy Classic Sudoku board starts with plenty of given numbers, so almost every empty cell yields to straightforward scanning. It is the level where most players learn the rules, build finger memory and start chasing faster solve times.',
      [Theme.Alphabet]:
        'Easy Alphabet Sudoku hands you a generous set of starting letters, so you can settle into the A–I grid without pressure. It is the gentlest way to train your eyes to read letters the way a solver reads digits.',
      [Theme.Color]:
        'Easy Color Sudoku fills much of the board from the first move, letting you chain matching colors across rows and boxes at a glance. A calm, visual warm-up that still teaches real scanning technique.',
    },
    tipsIntro: 'Easy puzzles rarely need notes. These three habits are enough:',
    tips: [
      {
        title: 'Scan one symbol at a time',
        text: 'Pick a symbol and mentally draw lines through every row and column it already occupies. Any 3×3 box crossed twice leaves exactly one possible cell for it.',
      },
      {
        title: 'Count what each box is missing',
        text: 'List the missing symbols in a 3×3 box, then cross out the ones blocked by its rows and columns. Whatever survives is a placement.',
      },
      {
        title: 'Fill the crowded units first',
        text: 'Rows, columns or boxes with the most givens have the fewest options — they almost always hide an easy single.',
      },
    ],
  },
  [Difficulty.Medium]: {
    meta: 'the middle ground where scanning meets note-taking',
    intro: {
      [Theme.Classic]:
        'Medium Classic Sudoku removes a handful of givens from the easy board — just enough that pure scanning stalls in places and note-taking starts to pay off. Expect a satisfying balance between flow and real deduction.',
      [Theme.Alphabet]:
        'Medium Alphabet Sudoku trims the starting letters until simple sweeps stop working everywhere. You will start double-checking letter pairs inside boxes — the exact habit harder levels demand.',
      [Theme.Color]:
        'Medium Color Sudoku keeps the palette short on clues: several boxes stay nearly empty early on, so you will lean on color elimination rather than pattern matching alone.',
    },
    tipsIntro: 'Medium is where candidate tracking enters the game:',
    tips: [
      {
        title: 'Keep pencil notes',
        text: 'Use the note mode to record every candidate a cell can hold. From this level up, notes stop being optional.',
      },
      {
        title: 'Hunt hidden singles',
        text: 'A symbol that fits only one cell of a row, column or box is a certain placement — even when that cell still shows several candidates in your notes.',
      },
      {
        title: 'Clear naked pairs',
        text: 'Two cells in one unit holding the same two candidates mean no other cell of that unit can take either symbol. Strike them and the unit often collapses.',
      },
    ],
  },
  [Difficulty.Hard]: {
    meta: 'pairs, triples and pointing candidates carry the solve',
    intro: {
      [Theme.Classic]:
        'Hard Classic Sudoku boards carry fewer clues and demand the classic toolkit: pencil marks, pairs and triples. Solves take longer, and every placement should be justified rather than guessed.',
      [Theme.Alphabet]:
        'Hard Alphabet Sudoku leaves long stretches of the grid blank, so sweeping A–I across intersecting rows and columns becomes essential. Letter pairs hidden inside boxes decide most solves.',
      [Theme.Color]:
        'Hard Color Sudoku asks you to hold missing colors in mind across three units at once. When two boxes rule out the same colors, the third one usually breaks the puzzle open.',
    },
    tipsIntro: 'Locked sets and box-line logic are the workhorses here:',
    tips: [
      {
        title: 'Lock pairs and triples',
        text: 'When two or three cells in a unit share the same two or three candidates, those symbols are locked there — eliminate them from every other cell of the unit.',
      },
      {
        title: 'Pointing pairs',
        text: 'If a symbol’s candidates inside a 3×3 box all sit on one row or column, the symbol cannot appear elsewhere on that line. Cut it and re-scan.',
      },
      {
        title: 'Box-line reduction',
        text: 'The mirror rule: when a line’s candidates for a symbol all fall inside one box, remove that symbol from the rest of the box.',
      },
    ],
  },
  [Difficulty.Expert]: {
    meta: 'X-Wings, locked quads and disciplined deduction on sparse boards',
    intro: {
      [Theme.Classic]:
        'Expert Classic Sudoku is for players who treat the grid as a logic system: fish patterns, box-line interactions and locked candidates carry the solve. Givens are minimal, and guessing reliably leads astray.',
      [Theme.Alphabet]:
        'Expert Alphabet Sudoku asks for the same advanced techniques with a less familiar symbol set — a genuinely different mental workout. Track letter candidates carefully; the chains run deep.',
      [Theme.Color]:
        'Expert Color Sudoku strips the board to its hardest core. Visual memory becomes a tool: recalling which colors a whole box still needs is often faster than re-deriving it.',
    },
    tipsIntro: 'At this depth you need patterns, not patience:',
    tips: [
      {
        title: 'The X-Wing',
        text: 'When a symbol’s candidates in two rows occupy the same two columns, that rectangle eliminates the symbol from every other cell in those columns.',
      },
      {
        title: 'Quads, naked and hidden',
        text: 'Four cells sharing four candidates lock a unit exactly the way pairs do. Hidden quads show up often on expert boards once you stop expecting them to be obvious.',
      },
      {
        title: 'Guess with discipline',
        text: 'If the grid truly stalls, pick a two-candidate cell, mark the branch and follow it to a contradiction or a breakthrough — then undo and take the other value if it breaks.',
      },
    ],
  },
  [Difficulty.Crazy]: {
    meta: 'our sparsest boards — layered chains for veteran solvers',
    intro: {
      [Theme.Classic]:
        'Crazy Classic Sudoku is our hardest setting: the sparsest boards we generate, built so the solve path runs through layered eliminations and long chains. Come warmed up.',
      [Theme.Alphabet]:
        'Crazy Alphabet Sudoku combines our sparsest boards with the letter grid. Every advanced technique helps, and a disciplined note system is close to mandatory.',
      [Theme.Color]:
        'Crazy Color Sudoku is the deepest challenge in the color set — near-empty boxes, long deduction chains and no forgiveness for careless placements.',
    },
    tipsIntro: 'Crazy boards are solved by structure, not by luck:',
    tips: [
      {
        title: 'Chain candidates',
        text: 'Link strong relationships — units where a symbol fits only two cells — and follow where a contradiction propagates. Chains are the bread and butter of crazy boards.',
      },
      {
        title: 'Solve regions, not cells',
        text: 'Target a whole box or line: enumerate its missing symbols and prove where each one must live before you touch the rest of the grid.',
      },
      {
        title: 'Respect the mistake counter',
        text: 'Crazy punishes rushing. Verify each placement against row, column and box before committing, and when you do slip, reread the chain that produced the error.',
      },
    ],
  },
};
