import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof Calendar>;

export default {
  title: 'Kit/Symbols/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      description: 'Заблокирован',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof Calendar>;

export const Base: Story = {
  name: 'Base Calendar',
  args: {
    isUTC: false,
    disabled: false,
  },
  render: (props) => {
    const [value, setValue] = React.useState<string | null>('2023-10-10');

    return (
      <div>
        <div>
          <p>{value || 'Select date'}</p>
        </div>
        <div>
          <Calendar
            {...props}
            format={'YYYY-MM-DD'}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
        </div>
      </div>
    );
  },
};
