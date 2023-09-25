import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '@library/kit';

type Story = StoryObj<typeof Paragraph>;

export default {
  title: 'Kit/Typography/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  decorators: [],
} satisfies Meta<typeof Paragraph>;

export const Primary: Story = {
  name: 'Paragraph',
  args: {
    children:
      'GraphQL — это язык запросов для API-интерфейсов и среда, в которой они выполняются. С помощью GraphQL можно получить данные из API и передать их в приложение (от сервера к клиенту). Официальная документация GraphQL есть только на английском языке, на русский язык пока ещё не переведена.',
  },
};
