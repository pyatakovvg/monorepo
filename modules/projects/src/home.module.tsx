import { Module } from '@library/app';

import React from 'react';

import { ProjectsView } from './View';
import { HomeController } from './home.controller';

@Module({
  view: <ProjectsView />,
  controller: HomeController,
})
export default class HomeModule {}
