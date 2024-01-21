import { Popover } from '@headlessui/react';
import classnames from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Difficulty, Theme } from '@/constants/constants';
import { capitalize } from '@/lib/utils';

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
      <div>Difficulty: </div>
      <div className="ml-2">
        <Popover className="relative">
          <Popover.Button className="flex items-center justify-center">
            {capitalize(current)} <ChevronDownIcon className="h-6 w-6" />
          </Popover.Button>
          <Popover.Panel className="absolute z-10">
            {options.map((option) => (
              <div
                key={option.difficulty}
                className={classnames('p-1', {
                  'cursor-pointer text-blue-500 hover:underline': option.difficulty !== current,
                })}
                onClick={() => option.difficulty !== current && onOptionClick(option.difficulty)}
              >
                {capitalize(option.difficulty)}
              </div>
            ))}
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  );
}
