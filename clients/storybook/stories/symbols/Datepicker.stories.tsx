import type { Meta, StoryObj } from '@storybook/react';
import { Datepicker, EMode } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof Datepicker>;

export default {
  title: 'Kit/Symbols/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: 'Цвет',
      defaultValue: EMode.DEFAULT,
      table: {
        type: {
          defaultValue: EMode.DEFAULT,
        },
      },
      options: [EMode.DEFAULT, EMode.DANGER],
      control: { type: 'select' },
    },
    disabled: {
      description: 'Заблокирован',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
    readOnly: {
      description: 'Для чтения',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof Datepicker>;

export const Base: Story = {
  name: 'Base Datepicker',
  args: {
    disabled: false,
    value: '2023-11-12',
    isClearable: false,
    isUTC: false,
  },
  render: (props) => {
    const [value, setValue] = React.useState(props.value);

    function handleValue(value: any) {
      setValue(value);
    }

    return (
      <div>
        <div>
          <Datepicker
            {...props}
            displayFormat={'LLLL'}
            format={'YYYY-MM-DDT00:00:00.000000Z'}
            value={value}
            onChange={handleValue}
            placeholder={'Можно выбрать одно значение'}
          />
        </div>
        <p>{value}</p>
      </div>
    );
  },
};
