import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@library/kit';

import React from 'react';

type Story = StoryObj<typeof Radio>;

export default {
  title: 'Kit/Symbols/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export const Base: Story = {
  name: 'Base Radio',
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
          <Radio name={'hello'} {...props} checked={checked} onChange={handleChange}>
            первый
          </Radio>
        </div>
        <div>
          <Radio name={'hello'} {...props} checked={checked} onChange={handleChange} />
        </div>
        <div>
          <Radio name={'hello'} {...props} checked={checked} onChange={handleChange} />
        </div>
        <div>
          <Radio name={'hello'} {...props} checked={checked} onChange={handleChange} />
        </div>
      </div>
    );
  },
};
