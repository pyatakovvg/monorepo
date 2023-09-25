import type { Meta, StoryObj } from '@storybook/react';
import { Button, EMode, ESize } from '@library/kit';

type Story = StoryObj<typeof Button>;

export default {
  title: 'Kit/Symbols/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Контент',
    },
    size: {
      description: 'Размер',
      defaultValue: ESize.MEDIUM,
      table: {
        type: {
          defaultValue: ESize.MEDIUM,
        },
      },
      options: [ESize.SMALL, ESize.MEDIUM, ESize.LARGE],
      control: { type: 'select' },
    },
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
    secondary: {
      description: 'Второстепенная',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof Button>;

export const Primary: Story = {
  name: 'Button primary',
  args: {
    size: ESize.MEDIUM,
    mode: EMode.PRIMARY,
    disabled: false,
    secondary: false,
    children: 'Применить',
  },
};
