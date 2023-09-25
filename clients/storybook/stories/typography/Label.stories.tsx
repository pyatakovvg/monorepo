import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@library/kit';

type Story = StoryObj<typeof Label>;

export default {
  title: 'Kit/Typography/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    required: {
      description: 'Обязатеный',
      table: {
        type: {
          defaultValue: false,
        },
      },
      control: 'boolean',
    },
  },
  decorators: [],
} satisfies Meta<typeof Label>;

export const Primary: Story = {
  name: 'Label',
  args: {
    required: false,
    children: 'Заголовок:',
  },
};
