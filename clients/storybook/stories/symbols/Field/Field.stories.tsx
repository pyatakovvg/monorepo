import type { Meta, StoryObj } from '@storybook/react';

import { InputField } from './InputField';

type Story = StoryObj<typeof InputField>;

export default {
  title: 'Kit/Symbols/Field',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    required: {
      description: 'Обязательный',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof InputField>;

export const Primary: Story = {
  name: 'Input primary',
  args: {
    label: 'Заголовок:',
    required: false,
    children: 'Выбранное значение',
  },
};
