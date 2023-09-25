import React from 'react';

interface IModuleContext {
  controller: any;
}

const context = React.createContext<IModuleContext>({} as any);
export const Provider = context.Provider;

export const useModule = (): IModuleContext => {
  const moduleContext = React.useContext(context);
  return {
    controller: moduleContext.controller,
  };
};
