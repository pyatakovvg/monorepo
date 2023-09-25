import type { Meta, StoryObj } from '@storybook/react';
import { Icon, icons, weights } from '@library/kit';

type Story = StoryObj<typeof Icon>;

export default {
  title: 'Kit/Symbols/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Иконка',
      defaultValue: icons[0],
      table: {
        type: {
          defaultValue: icons[0],
        },
      },
      options: [...icons],
      control: { type: 'select' },
    },
    weight: {
      description: 'Размерность',
      defaultValue: weights[0],
      table: {
        type: {
          defaultValue: weights[0],
        },
      },
      options: [...weights],
      control: { type: 'select' },
    },
  },
  decorators: [],
} satisfies Meta<typeof Icon>;

export const Primary: Story = {
  name: 'Icon',
  args: {
    weight: 'solid',
    icon: 'xmark',
  },
};
