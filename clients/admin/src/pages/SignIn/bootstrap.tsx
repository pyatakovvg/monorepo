import { Module } from '@library/app';

import React from 'react';

@Module({
  view: React.lazy(() => import('./View')),
  controller: null,
})
export default class SignInPage {}
