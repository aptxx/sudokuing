import { Popover } from '@headlessui/react';
import classnames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Difficulty, Theme } from '@/constants/constants';
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
    <div className="flex items-center justify-center">
      <div className="">
        <Popover className="relative">
          <Popover.Button className="flex items-center justify-center">
            {capitalize(current)} <ChevronDownIcon className="h-6 w-6" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10 rounded border border-gray-200 bg-white">
            {options.map((option) => (
              <div
                key={option.difficulty}
                className={classnames('border border-gray-200 py-1 pl-1 hover:bg-gray-100', {
                  'text-blue-500 ': option.difficulty === current,
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
            ))}
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
}
