import type { Meta, StoryObj } from '@storybook/react';
import { Input, EMode, ESize } from '@library/kit';

type Story = StoryObj<typeof Input>;

export default {
  title: 'Kit/Symbols/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: 'Цвет',
      defaultValue: EMode.PRIMARY,
      table: {
        type: {
          defaultValue: EMode.PRIMARY,
        },
      },
      options: [EMode.PRIMARY, EMode.SUCCESS, EMode.DANGER],
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
  },
  decorators: [],
} satisfies Meta<typeof Input>;

export const Primary: Story = {
  name: 'Input primary',
  args: {
    mode: EMode.PRIMARY,
    disabled: false,
    value: 'Применить',
  },
};
