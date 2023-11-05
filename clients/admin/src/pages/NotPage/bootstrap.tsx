import { Module } from '@library/app';

import React from 'react';

import { NotPageView } from './View';

@Module({
  view: <NotPageView />,
  controller: null,
})
export default class HomePage {}
