import type { Meta, StoryObj } from '@storybook/react';
import { DropDown } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof DropDown>;

export default {
  title: 'Kit/Symbols/DropDown',
  component: DropDown,
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
} satisfies Meta<typeof DropDown>;

export const Base: Story = {
  name: 'Base DropDown',
  args: {
    disabled: false,
  },
  render: () => {
    return (
      <div style={{ height: 120, background: 'red', overflow: 'hidden', padding: 30 }}>
        <DropDown>
          <DropDown.Content>
            <p>Hello world</p>
          </DropDown.Content>
          <DropDown.List>
            <div>
              <p>kkjgkjgjhg</p>
              <p>kkjgkjgjhg</p>
              <p>kkjgkjgjhg</p>
              <p>kkjgkjgjhg</p>
              <p>kkjgkjgjhg</p>
            </div>
          </DropDown.List>
        </DropDown>
      </div>
    );
  },
};
