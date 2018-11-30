import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { I18nContext } from './context';

export type I18nRenderProps = {
  i18n: i18next.i18n;
  t: i18next.TranslationFunction;
};
export type I18nProps = {
  children: (renderProps: I18nRenderProps) => any;
};
export class I18n extends React.Component<{}> {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func]).isRequired
  };

  render() {
    const { children } = this.props as any;

    return <I18nContext.Consumer>{({ i18n, t }) => children({ i18n, t })}</I18nContext.Consumer>;
  }
}
