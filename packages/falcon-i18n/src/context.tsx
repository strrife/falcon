import React from 'react';
import i18next from 'i18next';

export type I18nContextOptions = typeof defaultOptions;
export const defaultOptions = {
  wait: false,
  withRef: false,
  rerenderOn: ['languageChanged', 'loaded', 'added', 'removed'],
  translateFuncName: 't',
  nsMode: 'default',
  usePureComponent: false,
  omitBoundRerender: true
};

export type I18nContextValue = {
  i18n: i18next.i18n;
  t: i18next.TranslationFunction;
  language: string;
  options: I18nContextOptions;
};

let i18nInstance: i18next.i18n;

export function setI18n(instance: i18next.i18n) {
  i18nInstance = instance;
}

export function getI18n(): i18next.i18n {
  return i18nInstance;
}

export const I18nContext = React.createContext<I18nContextValue>({
  i18n: undefined as any,
  language: undefined as any,
  t: x => x,
  options: defaultOptions
});
