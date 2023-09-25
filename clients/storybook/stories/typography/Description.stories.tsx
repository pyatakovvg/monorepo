import type { Meta, StoryObj } from '@storybook/react';
import { Description } from '@library/kit';

type Story = StoryObj<typeof Description>;

export default {
  title: 'Kit/Typography/Description',
  component: Description,
  tags: ['autodocs'],
  decorators: [],
} satisfies Meta<typeof Description>;

export const Primary: Story = {
  name: 'Description',
  args: {
    children:
      'GraphQL — это язык запросов для API-интерфейсов и среда, в которой они выполняются. С помощью GraphQL можно получить данные из API и передать их в приложение (от сервера к клиенту). Официальная документация GraphQL есть только на английском языке, на русский язык пока ещё не переведена.',
  },
};
