import type { Meta, StoryObj } from '@storybook/react';
import { Link, Paragraph } from '@library/kit';

type Story = StoryObj<typeof Link>;

export default {
  title: 'Kit/Typography/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    target: {
      description: 'Направление',
      table: {
        type: {
          defaultValue: '_blank',
        },
      },
      options: [undefined, '_blank', '_self', '_parent', '_top', 'framename'],
      control: { type: 'select' },
    },
  },
  decorators: [],
} satisfies Meta<typeof Link>;

export const Primary: Story = {
  name: 'Link primary',
  args: {
    target: undefined,
    href: '#',
    children: '"перейти куда-нибудь"',
  },
};
