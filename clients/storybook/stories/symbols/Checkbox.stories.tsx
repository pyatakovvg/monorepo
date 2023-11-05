import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, EMode } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof Checkbox>;

export default {
  title: 'Kit/Symbols/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export const Base: Story = {
  name: 'Base Checkbox',
  args: {
    disabled: false,
  },
  render: (props) => {
    const [checked, setChecked] = React.useState(true);

    function handleChange() {
      setChecked(!checked);
    }

    return (
      <div>
        <div>
          <Checkbox {...props} checked={checked} onChange={handleChange} />
        </div>
        <Checkbox {...props} checked={checked} onChange={handleChange}>
          Hello
        </Checkbox>
      </div>
    );
  },
};
