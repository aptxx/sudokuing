import { Menu } from '@headlessui/react';
import classnames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Difficulty, Theme } from '@/components/sudoku/types';
import { capitalize } from '@/lib/utils';
import { SITE_TITLE } from '@/config/setting';

function generateGameLink(theme: Theme, difficulty: Difficulty) {
  if (theme === Theme.Classic) {
    return `/${difficulty}`;
  }
  return `/${theme}/${difficulty}`;
}

type Props = {
  theme: Theme;
  current: Difficulty;
  onClick?: (theme: Theme, difficulty: Difficulty) => void;
};

export default function DifficultySelect({ theme, current, onClick }: Props) {
  const options = [
    { difficulty: Difficulty.Easy },
    { difficulty: Difficulty.Medium },
    { difficulty: Difficulty.Hard },
    { difficulty: Difficulty.Expert },
    { difficulty: Difficulty.Crazy },
  ];

  const onOptionClick = (difficulty: Difficulty) => {
    onClick?.(theme, difficulty);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex">
        <span>{capitalize(current)}</span>
        <ChevronDownIcon className="h-6 w-6" />
      </Menu.Button>
      <Menu.Items className="absolute z-10 rounded border border-gray-200">
        {options.map((option) => (
          <Menu.Item key={option.difficulty}>
            <div
              className={classnames('bg-gray-100 px-1 pl-1 pr-6 hover:bg-gray-200', {
                'pointer-events-none cursor-default text-blue-500': option.difficulty === current,
              })}
            >
              <a
                href={generateGameLink(theme, option.difficulty)}
                title={`${theme} ${option.difficulty} - ${SITE_TITLE}`}
                onClick={() => option.difficulty !== current && onOptionClick(option.difficulty)}
              >
                {capitalize(option.difficulty)}
              </a>
            </div>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
