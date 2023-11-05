import type { Meta, StoryObj } from '@storybook/react';
import { DropDown } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof DropDown>;

export default {
  title: 'Kit/Symbols/DropDown',
  component: DropDown,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [],
} satisfies Meta<typeof DropDown>;

export const Base: Story = {
  name: 'Base DropDown',
  args: {},
  render: () => {
    return (
      <div style={{ height: 120, background: 'red' }}>
        <DropDown>
          <DropDown.Content></DropDown.Content>
          <DropDown.List></DropDown.List>
        </DropDown>
      </div>
    );
  },
};
