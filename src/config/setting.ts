export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const SITE_TITLE = 'Sudokuing';
export const SITE_DESCRIPTION =
  'Play free Sudoku online with three themes — classic numbers, alphabet letters, and colors. Five difficulty levels from easy to crazy. No download, no signup, play instantly in your browser.';
export const SITE_KEYWORDS = 'sudokuing, sudoku, sudoku online, web sudoku, sudoku puzzles, free sudoku, theme sudoku';

export const GOOGLE_MEASUREMENT_ID = '';
export const GOOGLE_GTM_ID = 'GTM-M8ZPDJWT';

export const DFP_REWARDED_ADUNIT =  process.env.NODE_ENV === 'production' ? '/22831606382/rewarded_web' : '/22639388115/rewarded_web_example';
export const DFP_BANNER_ADUNIT = process.env.NODE_ENV === 'production' ? '/22831606382/general/general_web_banner' : '/6355419/Travel/Europe/France/Paris';