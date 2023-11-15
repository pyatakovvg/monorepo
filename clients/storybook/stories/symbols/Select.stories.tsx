import type { Meta, StoryObj } from '@storybook/react';
import { EMode, Select } from '@library/kit';

import React from 'react';

interface ISelectedListOption {
  uuid: number;
  value: string;
}

type Story = StoryObj<typeof Select<ISelectedListOption>>;

export default {
  title: 'Kit/Symbols/Select',
  component: Select,
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
    isMultiselect: {
      description: 'Мультивыбор',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
    isClearable: {
      description: 'Сбрас',
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
  },
  decorators: [],
} satisfies Meta<typeof Select<ISelectedListOption>>;

export const Base: Story = {
  name: 'Base Select',
  args: {
    optionKey: 'uuid',
    optionValue: 'value',
    disabled: false,
    isMultiselect: false,
    isClearable: false,
    value: null,
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
    const [value2, setValue2] = React.useState([]);

    function handleValue(value: any) {
      setValue(value);
    }

    function handleValue2(value: any) {
      setValue2(value);
    }

    return (
      <div>
        <div>
          <Select {...props} value={value} onChange={handleValue} placeholder={'Можно выбрать одно значение'} />
        </div>
        <div style={{ margin: '32px 0 0' }}>
          <Select
            {...props}
            isMultiselect={true}
            value={value2}
            onChange={handleValue2}
            placeholder={'Можно выбрать несколько значений'}
          />
        </div>
      </div>
    );
  },
};
