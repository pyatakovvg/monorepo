import React from 'react';

interface IRouteOptions {
  layout?: any;
  isPublic?: boolean;
  isCacheable?: boolean;
}

export interface IViewProps {
  Splash: React.FC;
  Loader: React.FC;
}

export class Route {
  constructor(
    readonly path: string,
    readonly content: any | Route[],
    readonly options?: IRouteOptions,
  ) {}

  static async loadModule(content: Promise<any> | Function) {
    if (content instanceof Function) {
      content = content();
    }
    const Module = await content;
    const module = new Module.default();
    return module.createView();
  }
}
