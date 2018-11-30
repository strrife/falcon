import React from 'react';
import { i18n as Ii18n, TranslationFunction } from 'i18next';

let defaultOptions = {
  wait: false,
  withRef: false,
  bindI18n: 'languageChanged loaded',
  bindStore: 'added removed',
  translateFuncName: 't',
  nsMode: 'default',
  usePureComponent: false,
  omitBoundRerender: true
};
export type I18nContextOptions = typeof defaultOptions;

export type I18nContextValue = {
  i18n: Ii18n;
  t: TranslationFunction;
  language: string;
  options: I18nContextOptions;
};

export const I18nContext = React.createContext<I18nContextValue>({
  i18n: undefined as any,
  language: undefined as any,
  t: x => x,
  options: defaultOptions
});

export function setDefaults(options) {
  defaultOptions = { ...defaultOptions, ...options };
}

export function getDefaults() {
  return defaultOptions;
}

// eslint-disable-next-line
let i18nInstance;

export function setI18n(instance) {
  i18nInstance = instance;
}

export function getI18n() {
  return i18nInstance;
}

export const falconI18nextModule = {
  type: '3rdParty',

  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};
