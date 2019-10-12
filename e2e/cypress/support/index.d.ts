/// <reference types="cypress" />

declare module 'cypress-cucumber-preprocessor/steps' {
  const Given: (expression: RegExp | string, implementation: (...args: any[]) => any) => void;
  const Then: (expression: RegExp | string, implementation: (...args: any[]) => any) => void;
  const When: (expression: RegExp | string, implementation: (...args: any[]) => any) => void;

  function defineParameterType(options: any): void;
}

declare namespace Cypress {
  interface Chainable {
    dataE2e(tag: string, htmlTag?: string): Chainable<Element>;
  }
}
