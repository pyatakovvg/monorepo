import type { Meta, StoryObj } from '@storybook/react';
import { SelectedList } from '@library/kit';

import React from 'react';

interface ISelectedListOption {
  uuid: number;
  value: string;
}

type Story = StoryObj<typeof SelectedList<ISelectedListOption>>;

export default {
  title: 'Kit/Symbols/SelectedList',
  component: SelectedList,
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
} satisfies Meta<typeof SelectedList>;

export const Base: Story = {
  name: 'Base SelectedList',
  args: {
    optionKey: 'uuid',
    optionValue: 'value',
    disabled: false,
    value: [3],
    options: [
      {
        uuid: 1,
        value: 'Первая строка',
      },
      {
        uuid: 2,
        value: 'Вторая строка',
      },
      {
        uuid: 3,
        value: 'Третья строка',
      },
    ],
  },
  render: (props) => {
    const [value, setValue] = React.useState(props.value);

    function handleValue(value: any) {
      setValue(value);
    }
    return <SelectedList isMultiselect {...props} value={value} onChange={handleValue} />;
  },
};
