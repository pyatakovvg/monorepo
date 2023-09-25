import { Module } from '@library/app';

import React from 'react';

import { HomeController } from './home.controller';

@Module({
  view: React.lazy(() => import('./View')),
  controller: HomeController,
})
export default class HomeModule {}
