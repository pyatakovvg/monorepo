import { Module } from '@library/app';

import React from 'react';

import { HomeView } from './View';
import { HomeController } from './home.controller';

@Module({
  view: <HomeView />,
  controller: HomeController,
})
export default class HomeModule {}
