import React from 'react';
import i18next from 'i18next';
import { I18nContext, setI18n, defaultOptions } from './context';

export const I18nProvider: React.SFC<{ i18n: i18next.i18n; children }> = props => {
  const { i18n, children } = props;

  setI18n(i18n);

  return (
    <I18nContext.Provider
      value={{
        i18n,
        language: i18n.language,
        t: i18n.t.bind(i18n),
        options: defaultOptions
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
