import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { I18nContext, I18nContextOptions } from './context';

export type I18nRenderProps = {
  i18n: i18next.i18n;
  t: i18next.TranslationFunction;
};
export type I18nProps = {
  children: (renderProps: I18nRenderProps) => any;
};
export class I18n extends React.Component<I18nProps> {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func]).isRequired
  };

  constructor(props) {
    super(props);

    this.onI18nChanged = this.onI18nChanged.bind(this);
  }

  componentDidMount() {
    this.options!.rerenderOn.forEach(x => this.i18n!.on(x, this.onI18nChanged));
  }

  componentWillUnmount() {
    this.options!.rerenderOn.forEach(x => this.i18n!.off(x, this.onI18nChanged));
  }

  onI18nChanged() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ i18nChangedAt: new Date() });
  }

  i18n?: i18next.i18n = undefined;
  options?: I18nContextOptions = undefined;

  render() {
    const { children } = this.props;

    return (
      <I18nContext.Consumer>
        {({ i18n, t, options: contextOptions }) => {
          this.i18n = i18n;
          this.options = contextOptions;

          return children({ i18n, t });
        }}
      </I18nContext.Consumer>
    );
  }
}
