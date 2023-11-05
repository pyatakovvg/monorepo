import { Module } from '@library/app';

import React from 'react';

import { SignInView } from './View';

@Module({
  view: <SignInView />,
  controller: null,
})
export default class SignInPage {}
