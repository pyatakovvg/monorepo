import { Module } from '@library/app';

import React from 'react';

import { ErrorView } from './View';

@Module({
  view: <ErrorView />,
  controller: null,
})
export default class HomePage {}
