import type { Meta, StoryObj } from '@storybook/react';
import { Input, Button, EMode } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Kit/Symbols/Form',
  component: Input,
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
    placeholder: {
      description: 'Плейсхолдер',
    },
  },
  decorators: [],
} satisfies Meta<typeof Input>;

export const Base: Story = {
  name: 'Form',
  args: {
    mode: EMode.DEFAULT,
    disabled: false,
    value: 'Применить',
    placeholder: 'Введите значение',
    readOnly: false,
  },
  render: (props) => {
    const [value, setValue] = React.useState('');

    function handleValue(event: React.FormEvent<HTMLInputElement>) {
      setValue(event.currentTarget.value);
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <Input {...props} value={value} onInput={handleValue} />
        </div>
        <div style={{ margin: '0 0 0 8px' }}>
          <Button disabled={props.disabled}>Применить</Button>
        </div>
      </div>
    );
  },
};
