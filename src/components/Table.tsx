import text from '@/utils/text';
import React from 'react';
import { UiIconId } from './UiIcon';
import CircularBtn from './CircularBtn';

interface TableProps {
  headers: {
    label: string;
    key: string;
  }[];
  actions?: {
    icon: UiIconId;
    onClick: (index: number) => void;
  }[];
  data: Record<string, string | number>[];
  bg?: keyof typeof bgColors;
  className?: string;
}

const bgColors = {
  transparent: 'bg-transparent',
  primary: 'bg-bg',
  secondary: 'bg-bg-200',
  tertiary: 'bg-bg-300',
} as Record<string, string>;

export default function Table({
  headers,
  data,
  className,
  actions,
  bg = 'transparent',
}: TableProps) {
  if (!data.length) return null;

  return (
    <table
      className={text.join(
        'w-full border-spacing-4 border-separate rounded-lg',
        bgColors[bg],
        className,
      )}
    >
      <thead className="text-left">
        <tr>
          {headers.map(({ label, key }) => (
            <th key={key}>{label}</th>
          ))}

          {actions && <th>Ações</th>}
        </tr>
      </thead>

      <tbody className="border-spacing-2">
        {data.map((line, i) => (
          <tr key={i}>
            {headers.map(({ key }) => (
              <td key={key}>{line[key]}</td>
            ))}

            {actions && (
              <td className='flex gap-2'>
                {actions.map(({ icon, onClick }) => (
                  <CircularBtn
                    key={i}
                    icon={icon}
                    bg='transparent'
                    onClick={() => onClick(i)}
                  />
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
